import React, { useState, useMemo, useRef, useCallback } from 'react';
import { ContentType, type FormData, type StyleDefinition, type AudiovisualScene, type View, type VideoPreset } from '../../types';
import { Accordion } from './Accordion';
import { FormInput, FormTextarea, FormSelect, RatingSlider } from './FormControls';
// FIX: Imported TONES to resolve 'Cannot find name' error.
import { TEXT_TYPES, TARGET_AUDIENCES, MUSIC_GENRES, TONAL_SYNC_MAP, TONES } from '../../constants';
import { CLASSIFIED_STYLES } from '../../data/styles';
import InspirationWall from '../InspirationWall';
import { useTranslations } from '../../contexts/LanguageContext';
import { PRESETS } from '../../data/presets';
import { StyleSearchInput } from './StyleSearchInput';

const fileToDataUrl = (file: File): Promise<{ data: string; name: string; type: string; }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ data: reader.result as string, name: file.name, type: file.type });
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

interface FileUploaderProps {
    label: string;
    accept: string;
    acceptedFormats: string;
    file: { name: string; data: string } | null | undefined;
    onFileChange: (file: File) => void;
    onFileRemove: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ label, accept, acceptedFormats, file, onFileChange, onFileRemove }) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (files && files[0]) {
            onFileChange(files[0]);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    if (file) {
        return (
            <div className="md:col-span-2">
                <label className="font-medium text-gray-700">{label}</label>
                <div className="mt-2 relative group p-2 border rounded-lg bg-gray-100 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <button type="button" onClick={onFileRemove} className="p-1 bg-red-500 text-white rounded-full">&times;</button>
                </div>
            </div>
        );
    }

    return (
        <div className="md:col-span-2">
            <label className="font-medium text-gray-700">{label}</label>
            <div
                onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
                onClick={() => inputRef.current?.click()}
            >
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <p className="pl-1">Sube un archivo o arrástralo aquí</p>
                    </div>
                    <p className="text-xs text-gray-500">{acceptedFormats}</p>
                    <input ref={inputRef} type="file" className="hidden" accept={accept} onChange={(e) => handleFiles(e.target.files)} />
                </div>
            </div>
        </div>
    );
};


interface SpecificFieldsProps {
  contentType: ContentType;
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: any; type?: string; checked?: boolean; } }
  ) => void;
  allStyles: StyleDefinition[];
  onAddStyle: (newStyle: StyleDefinition) => void;
  onReset: (type: ContentType) => void;
  errors: Record<string, string>;
  onAnalyzeInspiration: (files: File[]) => void;
  inspirationAnalysisLoading: boolean;
  onAnalyzeInspirationForVideo: (files: File[]) => void;
  videoInspirationLoading: boolean;
  onAnalyzeScript: () => void;
  onImageUpload: (file: File) => void;
  onAudioUpload: (file: File) => void;
  onMusicUpload: (file: File) => void;
  onDocumentUpload: (file: File) => void;
  onApplyAudioPreset: (presetName: string) => void;
  knowledgeSources: { name: string; content: string }[];
  setView: (view: View) => void;
  onApplyPreset: (presetName: string) => void;
  onOpenAppendix: () => void;
}

export const SpecificFields: React.FC<SpecificFieldsProps> = ({
  contentType,
  formData,
  handleChange,
  allStyles,
  onAddStyle,
  onReset,
  errors,
  onAnalyzeInspiration,
  inspirationAnalysisLoading,
  onAnalyzeInspirationForVideo,
  videoInspirationLoading,
  onAnalyzeScript,
  onImageUpload,
  onAudioUpload,
  onMusicUpload,
  onDocumentUpload,
  onApplyAudioPreset,
  knowledgeSources,
  setView,
  onApplyPreset,
  onOpenAppendix,
}) => {
  const { t } = useTranslations();
  const specificsForText = formData.specifics[ContentType.Texto] || {};
  const specificsForImage = formData.specifics[ContentType.Imagen] || {};
  const specificsForVideo = formData.specifics[ContentType.Video] || {};
  const specificsForAudio = formData.specifics[ContentType.Audio] || {};
  const specificsForCodigo = formData.specifics[ContentType.Codigo] || {};
  
  const financialPresetNames = useMemo(() => [
    '[REPORTE] Viabilidad de Nuevo Activo (Chronos)',
  ], []);

  const narrativePresets = useMemo(() => PRESETS.filter(p => !financialPresetNames.includes(p.name)), [financialPresetNames]);
  const financialPresets = useMemo(() => PRESETS.filter(p => financialPresetNames.includes(p.name)), [financialPresetNames]);

  switch (contentType) {
    case ContentType.Texto:
      return (
        <div className="space-y-4">
          <Accordion title={t('creator.textFields.basicDetails.title')} defaultOpen>
            <FormSelect label={t('creator.textFields.basicDetails.textType')} id="type" name="type" value={specificsForText.type || ''} onChange={handleChange}>
              <option value="">Selecciona un tipo...</option>
              {TEXT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </FormSelect>
            <FormSelect label={t('creator.textFields.basicDetails.targetAudience')} id="audience" name="audience" value={specificsForText.audience || ''} onChange={handleChange}>
              <option value="">Selecciona una audiencia...</option>
              {TARGET_AUDIENCES.map(aud => <option key={aud} value={aud}>{aud}</option>)}
            </FormSelect>
          </Accordion>

          <Accordion title="Oficina del Director Financiero (CFO) Automatizada" defaultOpen>
            <div className="md:col-span-2">
                <FormSelect
                    label="Cargar CO-PRESET Financiero"
                    id="financialCoPreset"
                    name="narrativeCatalyst" // This will be the trigger
                    value={specificsForText.narrativeCatalyst || ''}
                    onChange={(e) => onApplyPreset(e.target.value)}
                >
                    <option value="">Selecciona un reporte...</option>
                    {financialPresets.map(preset => <option key={preset.name} value={preset.name}>{preset.name}</option>)}
                </FormSelect>
                <p className="mt-2 text-xs text-gray-500">Genera un análisis de viabilidad o un reporte de rentabilidad con un solo clic, orquestado por Kairos.</p>
            </div>
          </Accordion>
          
          <Accordion title={t('creator.textFields.automation.title')} defaultOpen>
              <div className="md:col-span-2">
                  <FormSelect
                      label={t('creator.textFields.automation.label')}
                      id="narrativeCatalyst"
                      name="narrativeCatalyst"
                      value={specificsForText.narrativeCatalyst || ''}
                      onChange={(e) => onApplyPreset(e.target.value)}
                  >
                      <option value="">{t('creator.textFields.automation.placeholder')}</option>
                      {narrativePresets.map(preset => <option key={preset.name} value={preset.name}>{preset.name}</option>)}
                  </FormSelect>
                  <p className="mt-2 text-xs text-gray-500">{t('creator.textFields.automation.info')}</p>
              </div>
          </Accordion>

          <Accordion title={t('creator.textFields.narrativeArchitecture.title')} defaultOpen>
            <FormTextarea label={t('creator.textFields.narrativeArchitecture.conflictPoint')} id="conflictPoint" name="conflictPoint" value={specificsForText.conflictPoint || ''} onChange={handleChange} rows={2} placeholder={t('creator.textFields.narrativeArchitecture.conflictPlaceholder')} />
            <FormTextarea label={t('creator.textFields.narrativeArchitecture.uvp')} id="uvp" name="uvp" value={specificsForText.uvp || ''} onChange={handleChange} rows={2} placeholder={t('creator.textFields.narrativeArchitecture.uvpPlaceholder')} />
            <FormInput label={t('creator.textFields.narrativeArchitecture.cta')} id="cta" name="cta" value={specificsForText.cta || ''} onChange={handleChange} placeholder={t('creator.textFields.narrativeArchitecture.ctaPlaceholder')} />
          </Accordion>

          <Accordion title={t('creator.textFields.dataStorytelling.title')} defaultOpen>
            <FormTextarea label={t('creator.textFields.dataStorytelling.rawData')} id="rawData" name="rawData" value={specificsForText.rawData || ''} onChange={handleChange} rows={4} placeholder={t('creator.textFields.dataStorytelling.rawDataPlaceholder')} />
            <FormSelect label={t('creator.textFields.dataStorytelling.translationAudience')} id="translationAudience" name="translationAudience" value={specificsForText.translationAudience || ''} onChange={handleChange}>
              <option value="">{t('creator.textFields.dataStorytelling.translationAudiencePlaceholder')}</option>
              {TARGET_AUDIENCES.map(aud => <option key={aud} value={aud}>{aud}</option>)}
            </FormSelect>
          </Accordion>
          
          <Accordion title={t('creator.textFields.knowledgeBase.title')} defaultOpen>
              <p className="text-sm text-gray-600 col-span-2">{t('creator.textFields.knowledgeBase.info')}</p>
              {knowledgeSources.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-700 col-span-2">
                      {knowledgeSources.map(s => <li key={s.name}>{s.name}</li>)}
                  </ul>
              ) : (
                  <p className="text-sm italic text-gray-500 col-span-2">{t('creator.textFields.knowledgeBase.noDocuments')}</p>
              )}
               <div className="col-span-2">
                  <button type="button" onClick={() => setView('knowledge-base')} className="text-sm font-semibold text-blue-600 hover:text-blue-800">{t('creator.textFields.knowledgeBase.manageButton')}</button>
              </div>
          </Accordion>

          <Accordion title={t('creator.textFields.documentUpload.title')} defaultOpen={false}>
              <p className="text-sm text-gray-600 col-span-2">{t('creator.textFields.documentUpload.info')}</p>
              <div className="col-span-2">
                  <input type="file" id="documentUpload" name="documentUpload" onChange={(e) => e.target.files && onDocumentUpload(e.target.files[0])} accept=".txt,.pdf,.json" className="text-sm"/>
                   {specificsForText.uploadedDocument && (
                       <div className="mt-2 text-sm flex items-center">
                           <span>{specificsForText.uploadedDocument.name}</span>
                           <button type="button" onClick={() => handleChange({ target: { name: 'uploadedDocument', value: undefined } })} className="ml-2 text-red-500 font-bold">&times;</button>
                       </div>
                   )}
              </div>
          </Accordion>

          <Accordion title={t('creator.textFields.tonalSync.title')} defaultOpen>
              <div className="md:col-span-2">
                 <StyleSearchInput
                    label={t('creator.textFields.tonalSync.style')}
                    id="visualToneSyncStyle"
                    name="visualToneSyncStyle"
                    value={specificsForText.visualToneSyncStyle || ''}
                    onChange={handleChange}
                    placeholder={t('creator.textFields.tonalSync.stylePlaceholder')}
                    allStyles={allStyles}
                />
              </div>
          </Accordion>
        </div>
      );
    case ContentType.Imagen:
      return (
        <div className="space-y-4">
            <Accordion title="Muro de Inspiración (Opcional)" defaultOpen>
              <InspirationWall onAnalyze={onAnalyzeInspiration} isLoading={inspirationAnalysisLoading} />
            </Accordion>
            <Accordion title="Estilo y Concepto" defaultOpen>
              <div className="md:col-span-2">
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">Estilos Artísticos (múltiple)</label>
                <select id="style" name="style" multiple value={specificsForImage.style || []} onChange={handleChange} className="w-full h-48 border border-gray-300 rounded-md">
                    {CLASSIFIED_STYLES.map(group => (
                        <optgroup key={group.id} label={group.category}>
                            {group.styles.map(style => <option key={style} value={style}>{style}</option>)}
                        </optgroup>
                    ))}
                </select>
              </div>
              <FormTextarea label="Elementos Principales" id="elements" name="elements" value={specificsForImage.elements || ''} onChange={handleChange} rows={2} placeholder="Ej: Un astronauta solitario, un árbol antiguo, un robot con un paraguas"/>
            </Accordion>

            <Accordion title="Composición y Ambiente" defaultOpen>
                <FormInput label="Fondo" id="background" name="background" value={specificsForImage.background || ''} onChange={handleChange} placeholder="Ej: Un paisaje marciano desolado, una ciudad futurista de neón" />
                <FormInput label="Localización / Entorno" id="location" name="location" value={specificsForImage.location || ''} onChange={handleChange} placeholder="Ej: Interior de una nave espacial, un bosque encantado" />
                <FormSelect label="Tipo de Plano" id="shotType" name="shotType" value={specificsForImage.shotType || ''} onChange={handleChange}>
                    <option value="">Selecciona un plano...</option>
                    <option>Primerísimo Primer Plano (Extreme Close-Up)</option>
                    <option>Primer Plano (Close-Up)</option>
                    <option>Plano Medio (Medium Shot)</option>
                    <option>Plano Americano</option>
                    <option>Plano General (Wide Shot)</option>
                </FormSelect>
                <FormInput label="Iluminación" id="lighting" name="lighting" value={specificsForImage.lighting || ''} onChange={handleChange} placeholder="Ej: Luz suave y difusa, hora dorada, claroscuro dramático" />
            </Accordion>
             <Accordion title="Parámetros Avanzados de IA" defaultOpen={false}>
                <RatingSlider label="Variedad (0-100)" id="variety" name="variety" value={specificsForImage.variety || 0} onChange={handleChange} min={0} max={100} step={1} />
                <RatingSlider label="Estilización (0-100)" id="stylization" name="stylization" value={specificsForImage.stylization || 0} onChange={handleChange} min={0} max={100} step={1} />
                <RatingSlider label="Rareza (0-100)" id="rarity" name="rarity" value={specificsForImage.rarity || 0} onChange={handleChange} min={0} max={100} step={1} />
            </Accordion>
        </div>
      );
    case ContentType.Video:
      return (
        <div className="space-y-4">
          <Accordion title="Muro de Inspiración (Opcional)" defaultOpen>
            <InspirationWall
              onAnalyze={onAnalyzeInspirationForVideo}
              isLoading={videoInspirationLoading}
              analyzeButtonText="Usar Imágenes para Video"
            />
          </Accordion>
          <Accordion title="Modo de Creación de Video" defaultOpen>
            <div className="md:col-span-2">
                <div className="flex flex-col gap-3">
                    <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50">
                        <input type="radio" name="videoCreationMode" value="text-to-video" checked={specificsForVideo.videoCreationMode === 'text-to-video'} onChange={handleChange} className="form-radio text-blue-600 h-5 w-5"/>
                        <span>Texto a Video</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50">
                        <input type="radio" name="videoCreationMode" value="image-to-video" checked={specificsForVideo.videoCreationMode === 'image-to-video'} onChange={handleChange} className="form-radio text-blue-600 h-5 w-5"/>
                        <span>Imagen a Video</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50">
                        <input type="radio" name="videoCreationMode" value="video-to-video" checked={specificsForVideo.videoCreationMode === 'video-to-video'} onChange={handleChange} className="form-radio text-blue-600 h-5 w-5"/>
                        <span>Video a Video</span>
                    </label>
                </div>
            </div>
          </Accordion>

          <Accordion title="Estilo Visual y Formato" defaultOpen>
            <FormSelect
              label="Relación de Aspecto"
              id="aspectRatio"
              name="aspectRatio"
              value={specificsForVideo.aspectRatio || '16:9'}
              onChange={handleChange}
            >
              <option value="16:9">16:9 (Horizontal)</option>
              <option value="9:16">9:16 (Vertical)</option>
              <option value="1:1">1:1 (Cuadrado)</option>
            </FormSelect>
            <div className="md:col-span-2">
                <label htmlFor="artisticStyle" className="mb-2 font-medium text-gray-700 block">Estilo Artístico</label>
                <select
                    id="artisticStyle"
                    name="artisticStyle"
                    multiple
                    value={specificsForVideo.artisticStyle || []}
                    onChange={handleChange}
                    className="w-full h-40 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white text-gray-800 border-gray-300"
                >
                    {CLASSIFIED_STYLES.map(group => (
                        <optgroup key={group.id} label={group.category}>
                            {group.styles.map(style => <option key={style} value={style}>{style}</option>)}
                        </optgroup>
                    ))}
                </select>
                <p className="mt-2 text-xs text-gray-500">Selecciona uno o más estilos para influir en la estética. Usa Ctrl/Cmd para seleccionar varios.</p>
            </div>
          </Accordion>
          
          <Accordion title="Dirección de Cámara y Estilo Visual" defaultOpen>
              <FormInput
                  label="Movimiento de Cámara"
                  id="cameraMovement"
                  name="cameraMovement"
                  value={specificsForVideo.cameraMovement || ''}
                  onChange={handleChange}
                  placeholder="Ej: Travelling lento, cámara en mano, plano orbital..."
              />
              <FormInput
                  label="Estilo Visual General"
                  id="visualStyle"
                  name="visualStyle"
                  value={specificsForVideo.visualStyle || ''}
                  onChange={handleChange}
                  placeholder="Ej: Look de cine noir, colores saturados de los 80, estética documental..."
              />
              <FormInput
                  label="Efectos Visuales (VFX)"
                  id="vfx"
                  name="vfx"
                  value={specificsForVideo.vfx || ''}
                  onChange={handleChange}
                  placeholder="Ej: Partículas brillantes, estelas de luz, efecto glitch..."
              />
              <FormInput
                  label="Entorno / Atmósfera"
                  id="environment"
                  name="environment"
                  value={specificsForVideo.environment || ''}
                  onChange={handleChange}
                  placeholder="Ej: Un bosque neblinoso, una ciudad futurista de neón, un laboratorio estéril..."
              />
          </Accordion>

          <Accordion title="Diseño de Sonido y Música" defaultOpen>
              <FormInput
                  label="Diseño de Sonido (Ambiente)"
                  id="soundDesign"
                  name="soundDesign"
                  value={specificsForVideo.soundDesign || ''}
                  onChange={handleChange}
                  placeholder="Ej: Viento suave, zumbido de maquinaria, silencio tenso..."
              />
              <FormSelect
                  label="Género Musical"
                  id="musicGenre"
                  name="musicGenre"
                  value={specificsForVideo.musicGenre || ''}
                  onChange={handleChange}
              >
                  <option value="">Selecciona un género...</option>
                  {MUSIC_GENRES.map(group => (
                      <optgroup key={group.category} label={group.category}>
                          {group.genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                      </optgroup>
                  ))}
              </FormSelect>
          </Accordion>

          {specificsForVideo.videoCreationMode === 'text-to-video' && (
              <Accordion title="Guion de Video" defaultOpen>
                  <div className="md:col-span-2">
                    <FormTextarea label="Descripción del Video (Prompt)" id="scriptSummary" name="scriptSummary" value={specificsForVideo.scriptSummary || ''} onChange={handleChange} rows={5} placeholder="Describe la historia, el tema o el concepto de tu video. Ej: 'Un documental sobre el impacto de la pirólisis en la economía circular de Bogotá...'" />
                  </div>
              </Accordion>
          )}

          {specificsForVideo.videoCreationMode === 'image-to-video' && (
              <Accordion title="Contenido de Origen" defaultOpen>
                  <FileUploader
                      label="Subir Imagen de Origen"
                      accept="image/png, image/jpeg, image/gif"
                      acceptedFormats="PNG, JPG, GIF"
                      file={specificsForVideo.sourceImageForVideo}
                      onFileChange={async (file) => {
                          const fileData = await fileToDataUrl(file);
                          handleChange({ target: { name: 'sourceImageForVideo', value: fileData }});
                      }}
                      onFileRemove={() => handleChange({ target: { name: 'sourceImageForVideo', value: undefined }})}
                  />
                  <div className="md:col-span-2">
                    <FormTextarea label="Prompt de Animación/Edición" id="mediaToVideoPrompt" name="mediaToVideoPrompt" value={specificsForVideo.mediaToVideoPrompt || ''} onChange={handleChange} rows={3} placeholder="Describe cómo animar o transformar la imagen. Ej: 'Hacer un zoom lento hacia el centro de la imagen, las nubes se mueven rápidamente.'" />
                  </div>
              </Accordion>
          )}

          {specificsForVideo.videoCreationMode === 'video-to-video' && (
              <Accordion title="Contenido de Origen" defaultOpen>
                   <FileUploader
                      label="Subir Video de Origen"
                      accept="video/mp4, video/webm, video/mov"
                      acceptedFormats="MP4, WebM, MOV"
                      file={specificsForVideo.sourceVideo}
                      onFileChange={async (file) => {
                          const fileData = await fileToDataUrl(file);
                          handleChange({ target: { name: 'sourceVideo', value: fileData }});
                      }}
                      onFileRemove={() => handleChange({ target: { name: 'sourceVideo', value: undefined }})}
                  />
                   <div className="md:col-span-2">
                    <FormTextarea label="Prompt de Edición/Transformación" id="mediaToVideoPrompt" name="mediaToVideoPrompt" value={specificsForVideo.mediaToVideoPrompt || ''} onChange={handleChange} rows={3} placeholder="Describe cómo editar o transformar el video. Ej: 'Cambiar el estilo a blanco y negro, añadir un efecto de película antigua.'" />
                  </div>
              </Accordion>
          )}
        </div>
      );
    case ContentType.Audio:
      return (
        <div className="space-y-4">
            <Accordion title="Contenido y Voz" defaultOpen>
                <FormTextarea label="Contenido del Guion" id="scriptContent" name="scriptContent" value={specificsForAudio.scriptContent || ''} onChange={handleChange} rows={5} placeholder="Escribe o pega aquí el texto a ser narrado." />
                <FormSelect label="Tono de Voz" id="voiceTone" name="voiceTone" value={specificsForAudio.voiceTone || ''} onChange={handleChange}>
                    <option value="">Selecciona un tono...</option>
                    {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                </FormSelect>
                <RatingSlider label="Velocidad de Lectura" id="readingSpeed" name="readingSpeed" value={specificsForAudio.readingSpeed || 50} onChange={handleChange} min={0} max={100} step={1} />
            </Accordion>
            <Accordion title="Diseño de Sonido" defaultOpen>
                <FormInput label="Ambiente Continuo" id="continuousAmbiance" name="continuousAmbiance" value={specificsForAudio.continuousAmbiance || ''} onChange={handleChange} placeholder="Ej: Viento suave, lluvia constante, zumbido de una ciudad" />
                <FormInput label="Efectos Aislados (SFX)" id="isolatedEffects" name="isolatedEffects" value={specificsForAudio.isolatedEffects || ''} onChange={handleChange} placeholder="Ej: Pasos, una puerta que se cierra, un trueno lejano" />
                <FormSelect label="Género Musical de Fondo" id="musicGenre" name="musicGenre" value={specificsForAudio.musicGenre || ''} onChange={handleChange}>
                    <option value="">Sin música</option>
                    {MUSIC_GENRES.map(group => (
                        <optgroup key={group.category} label={group.category}>
                            {group.genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                        </optgroup>
                    ))}
                </FormSelect>
            </Accordion>
        </div>
      );
    case ContentType.Codigo:
      return (
        <div className="space-y-4">
            <Accordion title="Generador de Código IA" defaultOpen>
                <FormSelect label="Tipo de Script" id="scriptType" name="scriptType" value={specificsForCodigo.scriptType || 'vrc'} onChange={handleChange}>
                    <option value="vrc">VRC (Visual Response Code)</option>
                    <option value="generador">Generador de Código</option>
                    <option value="validador_prompt">Validador de Prompt</option>
                    <option value="documentador">Documentador de Código</option>
                </FormSelect>
                {specificsForCodigo.scriptType === 'vrc' && (
                    <FormTextarea label="Dirección Emocional" id="emotionalDirection" name="emotionalDirection" value={specificsForCodigo.emotionalDirection || ''} onChange={handleChange} rows={3} placeholder="Describe la emoción o estado que el código debe representar visualmente." />
                )}
                {specificsForCodigo.scriptType === 'generador' && (
                    <>
                        <FormTextarea label="Prompt Base" id="basePrompt" name="basePrompt" value={specificsForCodigo.basePrompt || ''} onChange={handleChange} rows={3} placeholder="Describe la funcionalidad principal del código a generar." />
                        <FormTextarea label="Parámetros a Variar" id="parametersToVary" name="parametersToVary" value={specificsForCodigo.parametersToVary || ''} onChange={handleChange} rows={2} placeholder="Ej: número de iteraciones, tipo de datos de entrada" />
                    </>
                )}
                 {specificsForCodigo.scriptType === 'validador_prompt' && (
                    <>
                        <FormTextarea label="Prompt a Validar" id="promptToValidate" name="promptToValidate" value={specificsForCodigo.promptToValidate || ''} onChange={handleChange} rows={3} placeholder="Pega el prompt que quieres que la IA evalúe." />
                        <FormTextarea label="Criterios de Validación" id="validationCriteria" name="validationCriteria" value={specificsForCodigo.validationCriteria || ''} onChange={handleChange} rows={2} placeholder="Ej: Claridad, especificidad, ausencia de ambigüedad, potencial para generar resultados no deseados." />
                    </>
                )}
                 {specificsForCodigo.scriptType === 'documentador' && (
                    <FormTextarea label="Código a Documentar" id="codeToDocument" name="codeToDocument" value={specificsForCodigo.codeToDocument || ''} onChange={handleChange} rows={8} placeholder="Pega aquí el fragmento de código que necesita documentación." />
                )}
            </Accordion>
        </div>
      );
    default:
      return null;
  }
};