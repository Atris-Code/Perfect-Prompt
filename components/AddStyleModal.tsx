import React, { useState } from 'react';
import type { StyleDefinition } from '../types';
import { FormInput, FormTextarea } from './form/FormControls';

interface AddStyleModalProps {
  onClose: () => void;
  onSave: (newStyle: StyleDefinition) => void;
}

const AddStyleModal: React.FC<AddStyleModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    style: '',
    description: '',
    categoryName: '',
    dominantColors: '',
    accentColors: '',
    artistInspiration: '',
    keywords: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color.trim());
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.style.trim()) newErrors.style = 'El nombre del estilo es obligatorio.';
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria.';
    if (!formData.categoryName.trim()) newErrors.categoryName = 'La categoría es obligatoria.';
    
    const dominantColors = formData.dominantColors.split(',').filter(c => c.trim());
    if (dominantColors.length > 0 && !dominantColors.every(validateHexColor)) {
      newErrors.dominantColors = 'Todos los colores deben ser códigos hexadecimales válidos (ej: #FF5733).';
    }

    const accentColors = formData.accentColors.split(',').filter(c => c.trim());
    if (accentColors.length > 0 && !accentColors.every(validateHexColor)) {
      newErrors.accentColors = 'Todos los colores deben ser códigos hexadecimales válidos (ej: #FF5733).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const newStyle: StyleDefinition = {
        id_style: `custom_${Date.now()}`,
        style: formData.style.trim(),
        description: formData.description.trim(),
        category: 'personalizado', // Internal category for custom styles
        categoryName: formData.categoryName.trim(),
        sensacion_atmosfera: ['S1', 'Rigor y Precisión'], // Default sensation
        color_palette: {
          dominant: formData.dominantColors.split(',').map(c => c.trim()).filter(Boolean),
          accent: formData.accentColors.split(',').map(c => c.trim()).filter(Boolean),
        },
        artist_inspiration: formData.artistInspiration.split(',').map(a => a.trim()).filter(Boolean),
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
      };
      onSave(newStyle);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-style-modal-title"
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden transform animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h3 id="add-style-modal-title" className="text-2xl font-bold text-gray-900 mb-6">Añadir Estilo Personalizado</h3>
            
            <div className="space-y-4">
              <FormInput
                label="Nombre del Estilo"
                id="style"
                name="style"
                value={formData.style}
                onChange={handleChange}
                error={errors.style}
                required
              />
              <FormTextarea
                label="Descripción"
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              <FormInput
                label="Categoría"
                id="categoryName"
                name="categoryName"
                placeholder="Ej: Arte Digital, Ilustración"
                value={formData.categoryName}
                onChange={handleChange}
                error={errors.categoryName}
                required
              />
              <FormInput
                label="Colores Dominantes (separados por comas)"
                id="dominantColors"
                name="dominantColors"
                placeholder="Ej: #4E3A31, #A97D5D"
                value={formData.dominantColors}
                onChange={handleChange}
                error={errors.dominantColors}
              />
              <FormInput
                label="Colores de Acento (separados por comas)"
                id="accentColors"
                name="accentColors"
                placeholder="Ej: #9C3B2D, #3B6B5F"
                value={formData.accentColors}
                onChange={handleChange}
                error={errors.accentColors}
              />
              <FormInput
                label="Inspiración Artística (separados por comas)"
                id="artistInspiration"
                name="artistInspiration"
                placeholder="Ej: Artista A, Artista B"
                value={formData.artistInspiration}
                onChange={handleChange}
              />
               <FormInput
                label="Palabras Clave (separados por comas)"
                id="keywords"
                name="keywords"
                placeholder="Ej: futurista, neón, distopía"
                value={formData.keywords}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none">
              Guardar Estilo
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AddStyleModal;