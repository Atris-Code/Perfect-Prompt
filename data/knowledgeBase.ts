// This file contains the OCR'd text from the PDFs provided by the user.
// It serves as a local knowledge base for the Super-Agent Hybrid.

export const KNOWLEDGE_BASE = {
  PROMPT_QUALITY_ANALYSIS: `
Análisis de Calidad y Efectividad del
Prompt para
Comunicado de
Prensa

Introducción
El documento proporcionado es un prompt detallado para generar un comunicado de
prensa sobre la creación y validación de un activo de biochar tokenizado "PREMIUM".
Dado que el documento no contiene afirmaciones factuales para verificar, el análisis se
centra en la calidad y efectividad del prompt como herramienta para una inteligencia
artificial, evaluando su claridad, completitud, realismo del escenario y potencial para
generar un comunicado de prensa de alta calidad.

Evaluación del Prompt
1. Claridad y Coherencia
El prompt es excepcionalmente claro y coherente. La estructura es lógica, las
instrucciones son directas y no hay ambigüedad en lo que se espera. El rol asignado a
la IA ("director de comunicaciones corporativas") establece un tono y una perspectiva
claros desde el principio. Los "Detalles Clave a Incluir" están bien organizados y
definen los elementos esenciales del comunicado. El "Público Objetivo" y el "Tono y
Estilo" también están explícitamente definidos, lo que contribuye a una comprensión
inequívoca de la tarea.

2. Completitud
El prompt es muy completo. Incluye todos los componentes esenciales que se
esperarían para la generación de un comunicado de prensa profesional:
•
Contexto y Rol: Define claramente la situación y el rol de la IA.
• Detalles Específicos: Proporciona datos concretos como el nombre del activo
(BC-LOTE-006150) y la necesidad de definir "PREMIUM", lo que permite a la IA
rellenar información relevante.
•
•
•
•
•
•
Beneficios Clave: Destaca la importancia de la blockchain y la tokenización,
guiando a la IA sobre qué aspectos enfatizar.
Público Objetivo: Ayuda a la IA a adaptar el lenguaje y el enfoque.
Tono y Estilo: Establece las características deseables del lenguaje.
Estructura Detallada: Presenta una plantilla exhaustiva de un comunicado de
prensa, incluyendo titular, dateline, párrafo introductorio, cuerpo, citas, sección
"Sobre la Empresa" y contacto para medios. Esto es crucial para la generación
de un documento formal.
Consideraciones Adicionales: Ofrece pautas extra para refinar el resultado.
Ejemplo de Uso: Proporciona un ejemplo práctico de cómo se usaría el prompt,
lo que clarifica aún más las expectativas.
La inclusión de la definición de "PREMIUM" como un elemento a ser explicado por la IA
es un punto fuerte, ya que permite flexibilidad mientras asegura que un concepto clave
sea abordado.

3. Realismo del Escenario Propuesto
El escenario de "creación de Activo Biochar Tokenizado 'PREMIUM'" es altamente
realista y relevante en el contexto actual de la tecnología climática y las finanzas
sostenibles. La investigación de mercado confirma la existencia y el crecimiento del
biochar tokenizado y los créditos de carbono de alta calidad o "premium" [1, 2, 3].
Empresas como Toucan Protocol ya están creando mercados líquidos para créditos de
biochar [4], y la tokenización se reconoce como una herramienta para aumentar la
transparencia y la liquidez en los mercados de carbono [5]. Por lo tanto, el prompt se
basa en una realidad de mercado emergente y plausible.

4. Potencial para Generar un Comunicado de Prensa de
Alta Calidad
El prompt tiene un excelente potencial para generar un comunicado de prensa de alta
calidad. La combinación de instrucciones claras, una estructura detallada, la
especificación de tono y público, y la inclusión de elementos clave como las citas,
proporciona a la IA toda la información necesaria para producir un texto profesional y
efectivo. El ejemplo de uso al final del prompt demuestra cómo se puede especificar la
información variable (nombre de la empresa, definición de PREMIUM, blockchain
utilizada) para personalizar el comunicado, lo que lo hace muy adaptable y potente.

Calificación General
Considerando la claridad, completitud, realismo del escenario y el alto potencial para
generar un resultado de calidad, este prompt se califica con un +8 en una escala de -9
a +9.

Justificación de la Calificación:
La calificación de +8 refleja la excelencia del prompt en su diseño y efectividad. Es un
ejemplo sobresaliente de cómo estructurar una solicitud a una IA para obtener un
resultado complejo y profesional. La única razón por la que no alcanza un +9 es
porque, como cualquier prompt, siempre hay un margen mínimo para la interpretación o
la necesidad de ajustes finos por parte del usuario en casos muy específicos. Sin
embargo, su nivel de detalle y guía es casi perfecto para la tarea propuesta.

Referencias
1. Carbonmark. (2025, 22 de julio). The Rise of Tokenized Carbon Credits: Why
Blockchain Is....
https://www.carbonmark.com/post/the-rise-of-tokenized-carbon-credits-why-block
chain-is-changing-everything
2. S&P Global Commodity Insights. (2025, 3 de junio). Biochar carbon removal
credits mature amid tightening of global supply.
https://www.spglobal.com/commodity-insights/en/news-research/latest-news/elec
tric-power/060325-biochar-carbon-removal-credits-mature-amid-tightening-of-glo
bal-supply
3. Counteract.vc. (2025, 1 de septiembre). Locating the sweet spot for biochar
carbon removal.
https://counteract.vc/perspectives/locating-the-sweet-spot-for-biochar-carbon-re
moval
4. Toucan Protocol. (2024, 22 de marzo). CHAR | Liquid market for biochar credits.
https://blog.toucan.earth/onchain-climate-action-char/
5. Flowcarbon. (2025, 27 de marzo). Unlocking the Potential of Blockchain in
Biochar Carbon....
https://www.flowcarbon.com/knowcarbon/the-potential-of-blockchain-in-biochar
`,
  UTILITIES_ENERGY_DESIGN: `CHAPTER
Utilities and Energy Efficient Design
3
KEY LEARNING OBJECTIVES
•
How processes are heated and cooled
•
The systems used for delivering steam, cooling water, and other site utilities
•
Methods used for recovering process waste heat
•
How to use the pinch design method to optimize process heat recovery
•
How to design a heat-exchanger network
•
How energy is managed in batch processes
3.1 INTRODUCTION
Very few chemical processes are carried out entirely at ambient temperature. Most require process
streams to be heated or cooled to reach the desired operation temperature, to add or remove heats
of reaction, mixing, adsorption, etc., to sterilize feed streams, or to cause vaporization or condensa-
tion. Gas and liquid streams are usually heated or cooled by indirect heat exchange with another
fluid: either another process stream or a utility stream such as steam, hot oil, cooling water, or
refrigerant. The design of heat exchange equipment for fluids is addressed in Chapter 19. Solids are
usually heated and cooled by direct heat transfer, as described in Chapter 18. This chapter begins
with a discussion of the different utilities that are used for heating, cooling, and supplying other
needs such as power, water, and air to a process.
The consumption of energy is a significant cost in many processes. Energy costs can be reduced
by recovering waste heat from hot process streams and by making use of the fuel value of waste
streams. Section 3.4 discusses how to evaluate waste stream combustion as a source of process
heat. Section 3.3 introduces other heat recovery approaches.
When it is economically attractive, heating and cooling are accomplished by heat recovery
between process streams. The design of a network of heat exchangers for heat recovery can be a
complex task if there are many hot and cold streams in a process. Pinch analysis, introduced in
Section 3.5, is a systematic method for simplifying this problem.
The efficient use of energy in batch and cyclic processes is made more complicated by the
sequential nature of process operations. Some approaches to energy efficient design of batch and
cyclic processes are discussed in Section 3.6.
Chemical Engineering Design, Second Edition
©2013 Elsevier Ltd. All rights reserved.
103
104 CHAPTER 3 Utilities and Energy Efficient Design
3.2 UTILITIES
The word "utilities" is used for the ancillary services needed in the operation of any production
process. These services are normally supplied from a central site facility, and include:
1. Electricity
2. Fuel for fired heaters
3. Fluids for process heating
a. Steam
b. Hot oil or specialized heat transfer fluids
4. Fluids for process cooling
a. Cooling water
b. Chilled water
c. Refrigeration systems
5. Process water
a. Water for general use
b. Demineralized water
6. Compressed air
7. Inert-gas supplies (usually nitrogen)
Most plants are located on sites where the utilities are provided by the site infrastructure. The price
charged for a utility is mainly determined by the operating cost of generating and transmitting the
utility stream. Some companies also include a capital recovery charge in the utility cost, but if this is
done then the offsite (OSBL) capital cost of projects must be reduced to avoid double counting and
biasing the project capital-energy trade-off, leading to poor use of capital.
Some smaller plants purchase utilities “over the fence" from a supplier such as a larger site or a
utility company, in which case the utility prices are set by contract and are typically pegged to the
price of natural gas, fuel oil, or electricity.
The utility consumption of a process cannot be estimated accurately without completing the
material and energy balances and carrying out a pinch analysis, as described in Section 3.5.6. The
pinch analysis gives targets for process heat recovery and hence for the minimum requirements of hot
and cold utilities. More detailed optimization then translates these targets into expected demands for
fired heat, steam, electricity, cooling water, and refrigeration. In addition to the utilities required for
heating and cooling, the process may also need process water and air for applications such as wash-
ing, stripping, and instrument air supply. Good overviews of methods for design and optimization of
utility systems are given by Smith (2005) and Kemp (2007).
3.2.1 Electricity
The electricity demand of the process is mainly determined by the work required for pumping,
compression, air coolers, and solids-handling operations, but also includes the power needed for
instruments, lights, and other small users. The power required may be generated on site, but will
more usually be purchased from the local supply company. Some plants generate their own electri-
city using a gas-turbine cogeneration plant with a heat recovery steam generator (waste-heat boiler)
to raise steam (Figure 3.1). The overall thermal efficiency of such systems can be in the range 70%
to 80%; compared with the 30% to 40% obtained from a conventional power station, where the
3.2 Utilities
105
Air
Fuel
Compressor
Combustor
Turbine
Dynamo
Steam
Flue
gas to
stack
Supplementary
fuel
Secondary
combustor
Waste heat
boiler
Boiler
feed
water
FIGURE 3.1
Gas-turbine-based cogeneration plant.
heat in the exhaust steam is wasted in the condenser. The cogeneration plant can be sized to meet
or exceed the plant electricity requirement, depending on whether the export of electricity is an
attractive use of capital. This “make or buy" scenario gives chemical producers strong leverage
when negotiating electric power contracts and they are usually able to purchase electricity at or
close to wholesale prices. Wholesale electricity prices vary regionally (see www.eia.gov for details),
but are typically about $0.06/kWh in North America at the time of writing.
The voltage at which the supply is taken or generated will depend on the demand. In the United
States, power is usually transmitted over long distances at 135, 220, 550, or 750 kV. Local substations
step the power down to 35 to 69 kV for medium voltage transmission and then to 4 to 15 kV local dis-
tribution lines. Transformers at the plant are used to step down the power to the supply voltages used
on site. Most motors and other process equipment run on 208 V three-phase power, while 120/240 V
single-phase power is used for offices, labs, and control rooms.
On any site it is always worth considering driving large compressors and pumps with steam
turbines instead of electric motors and using the exhaust steam for local process heating.
Electric power is rarely used for heating in large-scale chemical plants, although it is often used
in smaller batch processes that handle nonflammable materials, such as biological processes. The
main disadvantages of electrical heating for large-scale processes are:
•
•
•
•
Heat from electricity is typically two to three times more expensive than heat from fuels, because
of the thermodynamic inefficiency of power generation.
Electric heating requires very high power draws that would substantially increase the electrical
infrastructure costs of the site.
Electric heating apparatus is expensive, requires high maintenance, and must comply with
stringent safety requirements when used in areas where flammable materials may be present.
Electric heaters are intrinsically less safe than steam systems. The maximum temperature that a
steam heater can reach is the temperature of the steam. The maximum temperature of an electric
106 CHAPTER 3 Utilities and Energy Efficient Design
heater is determined by the temperature controller (which could fail) or by burn-out of the
heating element. Electric heaters therefore have a higher probability of overheating.
Electric heating is more likely to be attractive in small-scale batch or cyclic processes, particularly
when the cost of heating is a small fraction of overall process costs and when the process calls for
rapid on-off heating.
A detailed account of the factors to be considered when designing electrical distribution systems
for chemical process plants, and the equipment used (transformers, switch gear, and cables), is
given by Silverman (1964). Requirements for electrical equipment used in hazardous (classified)
locations are given in the National Electrical Code (NFPA 70), as described in Section 10.3.5.
3.2.2 Fired Heat
Fired heaters are used for process heating duties above the highest temperatures that can be reached
using high pressure steam, typically about 250 °C (482 °F). Process streams may be heated directly
in the furnace tubes, or indirectly using a hot oil circuit or heat transfer fluid, as described in
Section 3.2.4. The design of fired heaters is described in Section 19.17. The cost of fired heat can
be calculated from the price of the fuel fired. Most fired process heaters use natural gas as fuel, as
it is cleaner burning than fuel oil and therefore easier to fit NOx control systems and obtain permits.
Natural gas also requires less maintenance of burners and fuel lines and natural gas burners can
often co-fire process waste streams such as hydrogen, light organic compounds, or air saturated
with organic compounds.
Natural gas and heating oil are traded as commodities and prices can be found at any online trad-
ing site or business news site (e.g., www.cnn.money.com). Historic prices for forecasting can be
found in the Oil and Gas Journal or from the U.S. Energy Information Adminstration (www.eia.gov).
The fuel consumed in a fired heater can be estimated from the fired heater duty divided by the
furnace efficiency. The furnace efficiency will typically be about 0.85 if both the radiant and convective
sections are used (see Chapter 19) and about 0.6 if the process heating is in the radiant section only.
Example 3.1
Estimate the annual cost of providing heat to a process from a fired heater using natural gas as fuel if the pro-
cess duty is 4 MW and the price of natural gas is $3.20 /MMBtu (million Btu).
Solution
If we assume that the fired heater uses both the radiant and convective sections then we can start by assuming
a heater efficiency of 0.85, so
Fuel required = Heater duty/heater efficiency = 4/0.85 = 4.71 MW
1 Btu/h = 0.29307 W, so 4.71 MW = 4.71/0.29307 = 16.07 MMBtu/h
Assuming 8000 operating hours per year, the total annual fuel consumption would be
Annual fuel use = 16.07×8000=128.6×103 MMBtu
Annual cost of fired heat = 128.6×103 × 3.20 = $411,400
3.2 Utilities 107
Note that if we had decided to carry out all of the heating in the radiant section only, then the fuel required
would have been 4/0.6 = 6.67 MW and the annual cost of heating would increase to $582,600 unless we could
find some other process use for the heat available in the convective section of the heater.
3.2.3 Steam
Steam is the most widely-used heat source in most chemical plants. Steam has a number of advantages
as a hot utility:
•
•
•
•
The heat of condensation of steam is high, giving a high heat output per pound of utility at
constant temperature (compared to other utilities such as hot oil and flue gas that release
sensible heat over a broad temperature range).
The temperature at which heat is released can be precisely controlled by controlling the pressure
of the steam. This enables tight temperature control, which is important in many processes.
Condensing steam has very high heat transfer coefficients, leading to cheaper heat exchangers.
Steam is nontoxic, nonflammable, visible if it leaks externally, and inert to many (but not all)
process fluids.
Most sites have a pipe network supplying steam at three or more pressure levels for different pro-
cess uses. A typical steam system is illustrated in Figure 3.2. Boiler feed water at high pressure is
preheated and fed to boilers where high pressure steam is raised and superheated above the dew
point to allow for heat losses in the piping. Boiler feed water preheat can be accomplished using
process waste heat or convective section heating in the boiler plant. High pressure (HP) steam is
FIGURE 3.2
Steam system.
Boiler &
superheat
HP main
BFW
preheat
Process
heating
MP main
8
Process
heating
LP main
Vent
Live
steam
Degassing
Condensate return
Process
Make-up heating
Process
heating
108 CHAPTER 3 Utilities and Energy Efficient Design
typically at about 40 bar, corresponding to a condensing temperature of 250 °C, but every site is
different. Some of the HP steam is used for process heating at high temperatures. The remainder of
the HP steam is expanded either through let-down valves or steam turbines known as back-pressure
turbines to form medium pressure (MP) steam. The pressure of the MP steam mains varies widely
from site to site, but is typically about 20 bar, corresponding to a condensing temperature of
212 °C. Medium pressure steam is used for intermediate temperature heating or expanded to form
low pressure (LP) steam, typically at about 3 bar, condensing at 134 °C. Some of the LP steam
may be used for process heating if there are low-temperature heat requirements. Low pressure
(or MP or HP) steam can also be expanded in condensing turbines to generate shaft work for pro-
cess drives or electricity production. A small amount of LP steam is used to strip dissolved noncon-
densable gases such as air from the condensate and make-up water. Low pressure steam is also
often used as “live steam" in the process, for example, as stripping vapor or for cleaning, purging,
or sterilizing equipment.
When steam is condensed without coming into contact with process fluids, the hot condensate
can be collected and returned to the boiler feed water system. Condensate can also sometimes be
used as a low-temperature heat source if the process requires low-temperature heat.
The price of HP steam can be estimated from the cost of boiler feed water treatment, the price
of fuel, and the boiler efficiency:
PHPS = PF X
dHb
Ив
+PBFW
where PHPS = price of high pressure steam ($/1000 lb, commonly written $/Mlb)
PF=price of fuel ($/MMBtu)
dH₁ = heating rate (MMBtu/Mlb steam)
Ив = boiler efficiency
PBFW=price or cost of boiler feed water ($/Mlb)
(3.1)
Package boilers typically have efficiencies similar to fired heaters, in the range 0.8 to 0.9.
The heating rate should include boiler feed water preheat, the latent heat of vaporization, and the
superheat specified.
The steam for process heating is usually generated in water-tube boilers, using the most econom-
ical fuel available.
The cost of boiler feed water includes allowances for water make-up, chemical treatment, and
degassing, and is typically about twice the cost of raw water; see Section 3.2.7. If no information
on the price of water is available, then 0.50 $/1000 lb can be used as an initial estimate. If the
steam is condensed and the condensate is returned to the boiler feed water (which will normally be
the case), then the price of steam should include a credit for the condensate. The condensate credit
will often be close enough to the boiler feed water cost that the two terms cancel each other out
and can be neglected.
The prices of medium and low pressure steam are usually discounted from the high pressure
steam price, to allow for the shaft work credit that can be gained by expanding the steam through a
turbine, and also to encourage process heat recovery by raising steam at intermediate levels and
using low-grade heat when possible. Several methods of discounting are used. The most rational of
these is to calculate the shaft work generated by expanding the steam between levels and price this
3.2 Utilities 109
as equivalent to electricity (which could be generated by attaching the turbine to a dynamo or else
would be needed to run a motor to replace the turbine if it is used as a driver). The value of the
shaft work then sets the discount between steam at different levels. This is illustrated in the follow-
ing example.
Example 3.2
A site has steam levels at 40 bar, 20 bar, and 6 bar. The price of fuel is $6/MMBtu and electricity costs $0.05/kWh.
If the boiler efficiency is 0.8 and the steam turbine efficiency is 0.85, suggest prices for HP, MP, and LP steam.
Solution
The first step is to look up the steam conditions, enthalpies, and entropies in steam tables:
Steam level
Pressure (bar)
Saturation temperature (°C)
HP
40
250
MP
LP
20
6
212
159
The steam will be superheated above the saturation temperature to allow for heat losses in the pipe network. The
following superheat temperatures were set to give an adequate margin above the saturation temperature for HP
steam and also to give (roughly) the same specific entropy for each steam level. The actual superheat temperatures
of MP and LP steam will be higher, due to the nonisentropic nature of the expansion.
Superheat temperature (°C)
Specific entropy, sg, (kJ/kg.K)
Specific enthalpy, hg, (kJ/kg)
400
6.769
3214
300
6.768
3025
160
6.761
2757
We can then calculate the difference in enthalpy between levels for isentropic expansion:
Isentropic delta enthalpy (kJ/kg)
189
268
Multiplying by the turbine efficiency gives the nonisentropic enthalpy of expansion:
Actual delta enthalpy (kJ/kg)
161
228
This can be converted to give the shaft work in customary units:
Shaft work (kWh/Mlb)
20.2
28.7
Multiplying by the price of electricity converts this into a shaft work credit:
Shaft work credit ($/Mlb)
1.01
1.44
The price of high pressure steam can be found from Equation 3.1, assuming that the boiler feed water cost is
cancelled out by a condensate credit. The other prices can then be estimated by subtracting the shaft work
credits.
Steam price ($/Mlb)
6.48
5.47
4.03
For quick estimates, this example can easily be coded into a spreadsheet and updated with the current prices of
fuel and power. A sample steam costing spreadsheet is available in the online material at booksite.elsevier.com/
Towler.
110 CHAPTER 3 Utilities and Energy Efficient Design
3.2.4 Hot Oil and Heat Transfer Fluids
Circulating systems of hot oil or specialized heat transfer fluids are often used as heat sources in
situations where fired heat or steam are not suitable. Heat transfer fluids and mineral oils can be
used over a temperature range from 50 °C to 400 °C. The upper temperature limit on use of hot
oils is usually set by thermal decomposition of the oil, fouling, or coking of heat-exchange tubes.
Some heat transfer fluids are designed to be vaporized and condensed in a similar manner to the
steam system, though at lower pressures; however, vaporization of mineral oils is usually avoided,
as less volatile components in the oil could accumulate and decompose, causing accelerated
fouling.
The most common situation where a hot oil system is used is in plants that have many relatively
small high-temperature heating requirements. Instead of building several small fired heaters, it can
be more economical to supply heat to the process from circulating hot oil streams and build a single
fired heater that heats the hot oil. Use of hot oil also reduces the risk of process streams being
exposed to high tube-wall temperatures that might be experienced in a fired heater. Hot oil systems
are often attractive when there is a high pressure differential between the process stream and HP
steam and use of steam would entail using thicker tubes. Hot oil systems can sometimes be justified
on safety grounds if the possibility of steam leakage into the process is very hazardous.
The most commonly used heat transfer fluids are mineral oils and Dowtherm A. Mineral oil sys-
tems usually require large flow rates of circulating liquid oil. When the oil is taken from a process
stream, as is common in oil refining processes, then it is sometimes called a pump-around system.
Dowtherm A is a mixture of 26.5 wt% diphenyl in diphenyl oxide. Dowtherm A is very thermally
stable and is usually operated in a vaporization-condensation cycle similar to the steam system,
although condensed liquid Dowtherm is sometimes used for intermediate temperature heating require-
ments. The design of Dowtherm systems and other proprietary heat transfer fluids are discussed in
detail in Singh (1985) and Green and Perry (2007).
The cost of the initial charge of heat transfer fluid usually makes a negligible contribution to the
overall cost of running a hot oil system. The main operating cost is the cost of providing heat to
the hot oil in the fired heater or vaporizer. If a pumped liquid system is used then the pumping
costs should also be evaluated. The costs of providing fired heat are discussed in Section 3.2.2. Hot
oil heaters or vaporizers usually use both the radiant and convective sections of the heater and have
heater efficiencies in the range 80% to 85%.
3.2.5 Cooling Water
When a process stream requires cooling at high temperature, various heat recovery techniques
should be considered. These include transferring heat to a cooler process stream, raising steam, pre-
heating boiler feed water, etc., as discussed in Section 3.3.
When heat must be rejected at lower temperatures, below about 120 °C (248 °F) (more strictly,
below the pinch temperature), then a cold utility stream is needed. Cooling water is the most com-
monly used cold utility in the temperature range 120 °C to 40 °C, although air cooling is preferred
in regions where water is expensive or the ambient humidity is too high for cooling water systems
to operate effectively. The selection and design of air coolers are discussed in Section 19.16. If a
process stream must be cooled to a temperature below 40 °C, cooling water or air cooling would be
3.2 Utilities 111
used down to a temperature in the range 40 °C to 50 °C, followed by chilled water or refrigeration
down to the target temperature.
Natural and forced-draft cooling towers are generally used to provide the cooling water required
on a site, unless water can be drawn from a convenient river or lake in sufficient quantity. Sea
water, or brackish water, can be used at coastal sites and for offshore operations, but if used directly
will require the use of more expensive materials of construction for heat exchangers (see Chapter 6).
The minimum temperature that can be reached with cooling water depends on the local climate.
Cooling towers work by evaporating part of the circulating water to ambient air, causing the
remaining water to be chilled. If the ambient temperature and humidity are high, then a cooling
water system will be less effective and air coolers or refrigeration would be used instead.
A schematic of a cooling water system is shown in Figure 3.3. Cooling water is pumped from
the cooling tower to provide coolant for the various process cooling duties. Each process cooler is
served in parallel and cooling water almost never flows to two coolers in series. The warmed water
is returned to the cooling tower and cooled by partial evaporation. A purge stream known as a
blowdown is removed upstream of the cooling tower, to prevent the accumulation of dissolved
solids as water evaporates from the system. A make-up stream is added to compensate for evapora-
tive losses, blowdown losses, and any other losses from the system. Small amounts of chemical
additives are also usually fed into the cooling water to act as biocides and corrosion and fouling
inhibitors.
The cooling tower consists of a means of providing high surface area for heat and mass transfer
between the warm water and ambient air, and a means of causing air to flow countercurrent to the
water. The surface area for contact is usually provided by flowing the water over wooden slats or
high-voidage packing. The cooled water is then collected at the bottom of the tower. In most mod-
ern cooling towers the air flow is induced by fans that are placed above the packed section of the
tower. For very large cooling loads natural-draft cooling towers are used, in which a large hyper-
bolic chimney is placed above the packed section to induce air flow. Some older plants use spray
ponds instead of cooling towers.
Process duties
Losses
Make-up and
additives
Evaporation losses
Circulation pumps
FIGURE 3.3
Schematic of cooling water system.
Blowdown
Cooling tower
112 CHAPTER 3 Utilities and Energy Efficient Design
Cooling water systems can be designed using a psychrometric chart if the ambient conditions are
known. A psychrometric chart is given in Figure 3.4. The cooling tower is usually designed so that
it will operate effectively except under the hottest (or most humid) conditions that can be expected
to occur no more than a few days each year.
The ambient temperature and humidity can be plotted on the psychrometric chart, allowing the
inlet air wet bulb temperature to be determined. This is the coldest temperature that the cooling
water could theoretically reach; however, in practice most cooling towers operate with a temperature
approach to the air wet bulb temperature of at least 2.8 °C (5 °F). Adding the approach temperature
to the inlet air wet bulb temperature, we can then mark the outlet water condition on the saturation
curve. For example, if the hottest ambient condition for design purposes is a dry bulb temperature
of 35 °C (95 °F) with 80% humidity, then we can mark this point on the psychrometric chart
(point A) and read the wet bulb temperature as roughly 32 °C (89.6 °F). Adding a 2.8 °C tempera-
ture approach would give a cold water temperature of about 35 °C (95 °F), which can then be
marked on the saturation line (point B).
The inlet water condition, or cooling water return temperature, is found by optimizing the trade-
off between water circulation costs and cooling tower cost. The difference between the cooling
water supply (coldest) and return (hottest) temperatures is known as the range or cooling range of
0.060
Φ=100%,
80%
170
C
0.055
8000
7000
Barometric pressure
101325 N/m²
h#=ha+whw
ha datum 15.0 °C
h from steam tables
Specific enthalpy h#,
kJ/(kg dry air)
60%
160
0.050
-40.
150
0.045
140
B
130
0.040
6000
12000
100
110
5000
90
80
4000
70
60
25
2000
3000
40
30
50
Wet bulb and dew point temperatures 35
°C
40%
0.035
0.030
-30
0.025
A
-20%- 0.020
0.015
20
0.010
15
20
10
0.005
1000
5.
100°C
0
0
10
----
20
Dry-bulb temperature, TDB, °C
FIGURE 3.4
Psychrometric chart (adapted with permission from Balmer (2010)).
----
---
----
0.000
30
40
50
w, kg water per kg dry air
Water vapor partial pressure, p, N/m²
3.2 Utilities 113
the cooling tower. As the cooling range is increased, the cost of the cooling tower is increased, but
the water flow rate that must be circulated decreases, and hence the pumping cost decreases. Note
that since most of the cooling is accomplished by evaporation of water rather than transfer of sensi-
ble heat to the air, the evaporative losses do not vary much with the cooling range. Most cooling
towers are operated with a cooling range between 5 °F and 20 °F (2.8 °C to 11.1 °C). A typical
initial design point would be to assume a cooling water return temperature about 10 °F (5.5 °C) hot-
ter than the cold water temperature. In the example above, this would give a cooling water return
temperature of 40.5 °C (105 °F), which can also be marked on the psychrometric chart (point C).
The difference in air humidity across the cooling tower can now be read from the right-hand axis as
the difference in moisture loadings between the inlet air (point A) and the outlet air (point C). The
cooling tower design can then be completed by determining the cooling load of the water from an
energy balance and hence determining the flow rate of air that is needed based on the change in air
humidity between ambient air and the air exit condition. The exit air is assumed to have a dry bulb
temperature equal to the cooling water return temperature, and the minimum air flow will be
obtained when the air leaves saturated with moisture. Examples of the detailed design of cooling
towers are given in Green and Perry (2007).
When carrying out the detailed design of a cooling tower it is important to check that the cool-
ing system has sufficient capacity to meet the site cooling needs over a range of ambient conditions.
In practice, multiple cooling water pumps are usually used so that a wide range of cooling water
flow rates can be achieved. When new capacity is added to an existing site, the limit on the cooling
system is usually the capacity of the cooling tower. If the cooling tower fans cannot be upgraded to
meet the increased cooling duty, additional cooling towers must be added. In such cases, it is often
cheaper to install air coolers for the new process rather than upgrading the cooling water system.
The cost of providing cooling water is mainly determined by the cost of electric power. Cooling
water systems use power for pumping the cooling water through the system and for running fans
(if installed) in the cooling towers. They also have costs for water make-up and chemical treatment.
The power used in a typical recirculating cooling water system is usually between 1 and 2 kWh/
1000 gal of circulating water. The costs of water make-up and chemical treatment usually add
about $0.02/1000 gal.
3.2.6 Refrigeration
Refrigeration is needed for processes that require temperatures below those that can be economically
obtained with cooling water, i.e., below about 40 °C. For temperatures down to around 10 °C, chilled
water can be used. For lower temperatures, down to -30 °C, salt brines (NaCl and CaCl2) are some-
times used to distribute the “refrigeration" around the site from a central refrigeration machine. Large
refrigeration duties are usually supplied by a standalone packaged refrigeration system.
Vapor compression refrigeration machines are normally used, as illustrated in Figure 3.5. The
working fluid (refrigerant) is compressed as a vapor, and then cooled and condensed at high pres-
sure, allowing heat rejection at high temperature in an exchanger known as a condenser. Heat is
usually rejected to a coolant such as cooling water or ambient air. The liquid refrigerant is then
expanded across a valve to a lower pressure, where it is vaporized in an exchanger known as an
evaporator, taking up heat at low temperature. The vapor is then returned to the compressor, com-
pleting the cycle.
114 CHAPTER 3 Utilities and Energy Efficient Design
Compressor
Coolant
Condenser 12
Process fluid
T
Evaporator
Expansion valve
FIGURE 3.5
Simple refrigeration cycle.
The working fluid for a refrigeration system must satisfy a broad range of requirements. It
should have a boiling point that is colder than the temperature that must be reached in the process
at a pressure that is above atmospheric pressure (to prevent leaks into the system). It should have a
high latent heat of evaporation, to reduce refrigerant flow rate. The system should operate well
below the critical temperature and pressure of the refrigerant, and the condenser pressure should not
be too high or the cost will be excessive. The freezing temperature of the refrigerant must be well
below the minimum operating temperature of the system. The refrigerant should also be nontoxic,
nonflammable, and have minimal environmental impact.
A wide range of materials have been developed for use as refrigerants, most of which are halo-
genated hydrocarbons. In some situations ammonia, nitrogen, and carbon dioxide are used. Cryo-
genic gas separation processes usually use the process fluids as working fluid; for example,
ethylene and propylene refrigeration cycles are used in ethylene plants.
Refrigeration systems use power to compress the refrigerant. The power can be estimated using
the cooling duty and the refrigerator coefficient of performance (COP).
COP=
Refrigeration produced (Btu/hr or MW)
Shaft work used (Btu/hr or MW)
(3.2)
The COP is a strong function of the temperature range over which the refrigeration cycle operates.
For an ideal refrigeration cycle (a reverse Carnot cycle), the COP is
T
COP=
(3.3)
where Te = evaporator absolute temperature (K)
T = condenser absolute temperature (K)
(T-Te)
The COP of real refrigeration cycles is always less than the Carnot efficiency. It is usually
about 0.6 times the Carnot efficiency for a simple refrigeration cycle, but can be as high as 0.9
times the Carnot efficiency if complex cycles are used. If the temperature range is too large then it
may be more economical to use a cascaded refrigeration system, in which a low-temperature cycle
rejects heat to a higher-temperature cycle that rejects heat to cooling water or ambient air. Good
3.2 Utilities 115
overviews of refrigeration cycle design are given by Dincer (2003), Stoecker (1998), and Trott and
Welch (1999).
The operating cost of a refrigeration system can be determined from the power consumption
and the price of power. Refrigeration systems are usually purchased as packaged modular plants
and the capital cost can be estimated using commercial cost estimating software as described in
Section 7.10. An approximate correlation for the capital cost of packaged refrigeration systems is
also given in Table 7.2.
Example 3.3
Estimate the annual operating cost of providing refrigeration to a condenser with duty 1.2 MW operating at
-5 °C. The refrigeration cycle rejects heat to cooling water that is available at 40 °C, and has an efficiency of
80% of the Carnot cycle efficiency. The plant operates for 8000 hours per year and electricity costs $0.06/kWh.
Solution
The refrigeration cycle needs to operate with an evaporator temperature below -5 °C, say at -10 °C or 263 K. The
condenser must operate above 40 °C, say at 45 °C (318 K).
For this temperature range the Carnot cycle efficiency is
T
263
COP=
=
=4.78
(T-Te) 318-263
If the cycle is 80% efficient then the actual coefficient of performance = 4.78 × 0.8 = 3.83
The shaft work needed to supply 1.2 MW of cooling is given by
Shaft work required =
COP
Cooling duty 1.2
3.83
=
=0.313 MW
The annual operating cost is then = 313 kW × 8000 h/y × 0.06 $/kWh = 150,000 $/y
(3.3)
3.2.7 Water
The water required for general purposes on a site will usually be taken from the local mains supply,
unless a cheaper source of suitable quality water is available from a river, lake, or well. Raw water
is brought in to make up for losses in the steam and cooling water systems and is also treated to
generate demineralized and deionized water for process use. Water is also used for process cleaning
operations and to supply fire hydrants.
The price of water varies strongly by location, depending on fresh water availability. Water
prices are often set by local government bodies and often include a charge for waste water rejection.
This charge is usually applied on the basis of the water consumed by the plant, regardless of
whether that water is actually rejected as a liquid (as opposed to being lost as vapor or incorporated
into a product by reaction). A very rough estimate of water costs can be made by assuming $2 per
1000 gal ($0.5 per metric ton).
116 CHAPTER 3 Utilities and Energy Efficient Design
Demineralized Water
Demineralized water, from which all the minerals have been removed by ion-exchange, is used
where pure water is needed for process use, and as boiler feed water. Mixed and multiple-bed ion-
exchange units are used; one resin converting the cations to hydrogen and the other removing the
anions. Water with less than 1 part per million of dissolved solids can be produced. The design of
ion exchange units is discussed in Section 16.5.5. Demineralized water typically costs about double
the price of raw water, but this obviously varies strongly with the mineral content of the water and
the disposal cost of blowdown from the demineralization system. A correlation for the cost of a
water ion exchange plant is given in Table 7.2.
3.2.8 Compressed Air
Compressed air is needed for general use, for oxidation reactions, air strippers, aerobic fermentation
processes, and for pneumatic control actuators that are used for plant control. Air is normally dis-
tributed at a mains pressure of 6 bar (100 psig), but large process air requirements are typically met
with standalone air blowers or compressors. Rotary and reciprocating single-stage or two-stage com-
pressors are used to supply utility and instrument air. Instrument air must be dry and clean (free
from oil). Air is usually dried by passing it over a packed bed of molecular sieve adsorbent. For most
applications, the adsorbent is periodically regenerated using a temperature-swing cycle. Temperature
swing adsorption (TSA) is discussed in more detail in Section 16.2.1.
Air at 1 atmosphere pressure is freely available in most chemical plants. Compressed air can be
priced based on the power needed for compression (see Section 20.6). Drying the air, for example
for instrument air, typically adds about $0.005 per standard m³ ($0.14/1000 scf).
Cooling Air
Ambient air is used as a coolant in many process operations; for example, air cooled heat exchan-
gers, cooling towers, solids coolers, and prilling towers. If the air flow is caused by natural draft
then the cooling air is free, but the air velocity will generally be low, leading to high equipment
cost. Fans or blowers are commonly used to ensure higher air velocities and reduce equipment
costs. The cost of providing cooling air is then the cost of operating the fan, which can be deter-
mined from the fan power consumption. Cooling fans typically operate with very high flow rates
and very low pressure drop, on the order of a few inches of water. The design of a cooling fan is
illustrated in the discussion of air cooled heat exchangers in Section 19.16.
3.2.9 Nitrogen
Where a large quantity of inert gas is required for the inert blanketing of tanks and for purging (see
Chapter 10) this will usually be supplied from a central facility. Nitrogen is normally used, and can
be manufactured on site in an air liquefaction plant, or purchased as liquid in tankers.
Nitrogen and oxygen are usually purchased from one of the industrial gas companies via pipe-
line or a small dedicated “over-the-fence” plant. The price varies depending on local power costs,
but is typically in the range $0.01 to $0.03 per lb for large facilities.
3.3 Energy Recovery 117
3.3 ENERGY RECOVERY
Process streams at high pressure or temperature contain energy that can be usefully recovered.
Whether it is economical to recover the energy content of a particular stream depends on the value of
the energy that can be usefully extracted and the cost of recovery. The value of the energy is related
to the marginal cost of energy at the site. The cost of recovery will be the capital and operating cost
of any additional equipment required. If the savings exceed the total annualized cost, including capi-
tal charges, then the energy recovery will usually be worthwhile. Maintenance costs should be
included in the annualized cost (see Chapter 9).
Some processes, such as air separation, depend on efficient energy recovery for economic opera-
tion, and in all processes the efficient use of energy will reduce product cost.
When setting up process simulation models, the design engineer needs to pay careful attention to
operations that have an impact on the energy balance and heat use within the process. Some com-
mon problems to watch out for include:
1. Avoid mixing streams at very different temperatures. This usually represents a loss of heat (or
cooling) that could be better used in the process.
2. Avoid mixing streams at different pressures. The mixed stream will be at the lowest pressure of
the feed streams. The higher pressure streams will undergo cooling as a result of adiabatic
expansion. This may lead to increased heating or cooling requirements or lost potential to
recover shaft work during the expansion.
3. Segment heat exchangers to avoid internal pinches. This is particularly necessary for exchangers
where there is a phase change. When a liquid is heated, boiled, and superheated, the variation of
stream temperature with enthalpy added looks like Figure 3.6. Liquid is heated to the boiling
point (A-B), then the heat of vaporization is added (B-C) and the vapor is superheated (C-D).
This is a different temperature-enthalpy profile than a straight line between the initial and final
states (A-D). If the stream in Figure 3.6 were matched against a heat source that had a
temperature profile like line E-F in Figure 3.7, then the exchanger would appear feasible based
on the inlet and outlet temperatures, but would in fact be infeasible because of the cross-over of
T
A
B
C
D
T
H
B
C
E
A
F
D
H
FIGURE 3.6
Temperature-enthalpy profile for a stream that is
vaporized and superheated.
FIGURE 3.7
Heat transfer to a stream that is vaporized and
superheated.
118
CHAPTER 3 Utilities and Energy Efficient Design
the temperature profiles at B. A simple way to avoid this problem is to break up the preheat,
boiling, and superheat into three exchangers in the simulation model, even if they will be
carried out in a single piece of equipment in the final design. The same problem also occurs
with condensers that incorporate desuperheat and subcooling.
4. Check for heat of mixing. This is important whenever acids or bases are mixed with water. If
the heat of mixing is large, two or more stages of mixing with intercoolers may be needed. If a
large heat of mixing is expected, but is not predicted by the model, then check that the
thermodynamic model includes heat of mixing effects.
5. Remember to allow for process inefficiency and design margins. For example, when sizing a
fired heater, if process heating is carried out in the radiant section only, the heating duty
calculated in the simulation is only 60% of the total furnace duty (see Sections 3.2.2 and 19.17).
The operating duty will then be the process duty divided by 0.6. The design duty must be
increased further by a suitable design factor, say 10%. The design duty of the fired heater is
then 1.1/0.6 = 1.83 times the process duty calculated in the simulation.
Some of the techniques used for energy recovery in chemical process plants are described briefly
in the following sections. The references cited give fuller details of each technique. Miller (1968)
gives a comprehensive review of process energy systems, including heat exchange and power recov-
ery from high-pressure fluid streams. Kenney (1984) reviews the application of thermodynamic
principles to energy recovery in the process industries. Kemp (2007) gives a detailed description of
pinch analysis and several other methods for heat recovery.
3.3.1 Heat Exchange
The most common energy-recovery technique is to use the heat in a high-temperature process
stream to heat a colder stream. This saves part or all of the cost of heating the cold stream, as well
as part or all of the cost of cooling the hot stream. Conventional shell and tube exchangers are nor-
mally used. The cost of the heat exchange surface may be increased relative to using a hot utility as
heat source, due to the reduced temperature driving forces, or decreased, due to needing fewer
exchangers. The cost of recovery will be reduced if the streams are located conveniently close
within the plant.
The amount of energy that can be recovered depends on the temperature, flow, heat capacity,
and temperature change possible, in each stream. A reasonable temperature driving force must be
maintained to keep the exchanger area to a practical size. The most efficient exchanger will be the
one in which the shell and tube flows are truly countercurrent. Multiple tube-pass exchangers are
usually used for practical reasons. With multiple tube passes the flow is part countercurrent and
part cocurrent and temperature crosses can occur, which reduce the efficiency of heat recovery (see
Chapter 19). In cryogenic processes, where heat recovery is critical to process efficiency, brazed or
welded plate exchangers are used to obtain true countercurrent performance and very low tempera-
ture approaches on the order of a few degrees Celsius are common.
The hot process streams leaving a reactor or a distillation column are frequently used to preheat
the feed streams (“feed-effluent” or “feed-bottoms" exchangers).
In an industrial process there will be many hot and cold streams and there will be an optimum
arrangement of the streams for energy recovery by heat exchange. The problem of synthesizing a
3.3 Energy Recovery 119
network of heat exchangers has been the subject of much research and is covered in more detail in
Section 3.5.
3.3.2 Waste-heat Boilers
If the process streams are at a sufficiently high temperature and there are no attractive options for
process-to-process heat transfer, then the heat recovered can be used to generate steam.
Waste-heat boilers are often used to recover heat from furnace flue gases and the process gas
streams from high-temperature reactors. The pressure, and superheat temperature, of the steam gen-
erated depend on the temperature of the hot stream and the approach temperature permissible at the
boiler exit. As with any heat-transfer equipment, the area required increases as the mean tempera-
ture driving force (log mean ∆T) is reduced. The permissible exit temperature may also be limited
by process considerations. If the gas stream contains water vapor and soluble corrosive gases, such
as HCl or SO2, the exit gas temperature must be kept above the dew point.
Hinchley (1975) discusses the design and operation of waste-heat boilers for chemical plants.
Both fire-tube and water-tube boilers are used. A typical arrangement of a water-tube boiler on a
reformer furnace is shown in Figure 3.8 and a fire-tube boiler in Figure 3.9.
The application of a waste-heat boiler to recover energy from the reactor exit streams in a nitric
acid plant is shown in Figure 3.10. The selection and operation of waste-heat boilers for industrial
furnaces is discussed by Dryden (1975).
Water in
Gas outlet
Steam/water out
Metal shroud
Refractory
lining
Gas inlet
FIGURE 3.8
Reformed gas waste-heat boiler arrangement of vertical U-tube water-tube boiler. (Reprinted by permission of
the Council of the Institution of Mechanical Engineers from the Proceedings of the Conference on Energy
Recovery in the Process Industries, London, 1975.)
120
CHAPTER 3 Utilities and Energy Efficient Design
Ferrule wrapped with
insulating fiber
Process gas
outlet 550 °C
Steam/water
riser pipes
Alloy 800 ferrule
Concrete
Alloy 800
production plate
Process gas
1200/1000 °C
Refractory/concrete
External insulation
Water downcomer pipes
Blowdown connection
Insulating concrete
FIGURE 3.9
Reformed gas waste-heat boiler, principal features of typical natural circulation fire-tube boilers. (Reprinted by
permission of the Council of the Institution of Mechanical Engineers from the Proceedings of the Conference
on Energy Recovery in the Process Industries, London, 1975.)
Air
①
Secondary air
Stream
To stack
From absorption
tower no. 5
Air from
bleacher
13
9
(11)
14
17
M
Ammonia
②
10
12
To oxidation
tower
Water
Water 12 HNO3
202 ΗΝΟ3
1. Air entry
6. Air preheater
2. Ammonia vaporiser
7. Gas mixer
3. Ammonia filter
8. Gas filters
4. Control valves
9. Converters
5. Air-scrubbing tower
(From nitric acid manufacture, Miles (1961), with permission)
To absorption
14. Compressor
15. Steam turbine
16. Heat exchanger
17. Gas cooler No. 2
10. Lamont boilers
11. Steam drum
12. Gas cooler No. 1
13. Exhaust turbine
FIGURE 3.10
Connections of a nitric acid plant, intermediate pressure type.
3.3 Energy Recovery 121
3.3.3 High-temperature Reactors
If a reaction is highly exothermic, cooling will be needed. If the reactor temperature is high enough,
the heat removed can be used to generate steam. The lowest steam pressure normally used in the
process industries is about 2.7 bar (25 psig), so any reactor with a temperature above 150 °C is a
potential steam generator. Steam is preferentially generated at as high a pressure as possible,
as high pressure steam is more valuable than low pressure steam (see Section 3.2.3). If the steam
production exceeds the site steam requirements, some steam can be fed to condensing turbines to
produce electricity to meet site power needs.
Three systems are used:
1. Figure 3.11(a). An arrangement similar to a conventional water-tube boiler. Steam is generated
in cooling pipes within the reactor and separated in a steam drum.
2. Figure 3.11(b). Similar to the first arrangement but with the water kept at high pressure to
prevent vaporization. The high-pressure water is flashed to steam at lower pressure in a flash
drum. This system would give more responsive control of the reactor temperature.
3. Figure 3.11(c). In this system a heat-transfer fluid, such as Dowtherm A (see Section 3.2.4 and
Singh (1985) for details of heat-transfer fluids), is used to avoid the need for high-pressure
tubes. The steam is raised in an external boiler.
3.3.4 High-pressure Process Streams
Where high-pressure gas or liquid process streams are throttled to lower pressures, energy can be
recovered by carrying out the expansion in a suitable turbine.
Gas Streams
The economic operation of processes that involve the compression and expansion of large quantities
of gases, such as ammonia synthesis, nitric acid production, and air separation, depends on the
efficient recovery of the energy of compression. The energy recovered by expansion is often used
to drive the compressors directly, as shown in Figure 3.10. If the gas contains condensable compo-
nents, it may be advisable to consider heating the gas by heat exchange with a higher temperature
Σ
Reactor
(a)
FIGURE 3.11
Steam generation.
Steam
Steam drum
Reactor
(b)
Steam
Flash drum
Feed pump
Reactor
(c)
Q
Steam
WW
Boiler
Feed
water
122 CHAPTER 3 Utilities and Energy Efficient Design
process stream before expansion. The gas can then be expanded to a lower pressure without
condensation and the power generated increased.
The process gases do not have to be at a particularly high pressure for expansion to be economical
if the gas flow rate is high. For example, Luckenbach (1978) in U.S. patent 4,081,508 describes a
process for recovering power from the off-gas from a fluid catalytic cracking process by expansion
from about 2 to 3 bar (15 to 25 psig) down to just over atmospheric pressure (1.5 to 2 psig).
The energy recoverable from the expansion of a gas can be estimated by assuming polytropic
expansion; see Section 20.6.3 and Example 20.4. The design of turboexpanders for the process
industries is discussed by Bloch et al. (1982).
Liquid Streams
As liquids are essentially incompressible, less energy is stored in a compressed liquid than a gas;
however, it is often worth considering power recovery from high-pressure liquid streams (>15 bar),
as the equipment required is relatively simple and inexpensive. Centrifugal pumps are used as
expanders and are often coupled directly to other pumps. The design, operation, and cost of energy
recovery from high-pressure liquid streams is discussed by Jenett (1968), Chada (1984), and Buse
(1981).
3.3.5 Heat Pumps
A heat pump is a device for raising low-grade heat to a temperature at which the heat can be used. It
pumps the heat from a low temperature source to the higher temperature sink, using a small amount
of energy relative to the heat energy recovered. A heat pump is essentially the same as a refrigeration
cycle (Section 3.2.6 and Figure 3.5), but the objective is to deliver heat to the process in the conden-
sation step of the cycle, as well as (or instead of) removing heat in the evaporation step.
Heat pumps are increasingly finding applications in the process industries. A typical application
is the use of the low-grade heat from the condenser of a distillation column to provide heat for the
reboiler; see Barnwell and Morris (1982) and Meili (1990). Heat pumps are also used with dryers;
heat is abstracted from the exhaust air and used to preheat the incoming air.
Details of the thermodynamic cycles used for heat pumps can be found in most textbooks on
engineering thermodynamics, and in Reay and MacMichael (1988). In the process industries, heat
pumps operating on the mechanical vapor compression cycle are normally used. A vapor compression
heat pump applied to a distillation column is shown in Figure 3.12(a). The working fluid, usually a
commercial refrigerant, is fed to the reboiler as a vapor at high pressure and condenses, giving up
heat to vaporize the process fluid. The liquid refrigerant from the reboiler is then expanded over a
throttle valve and the resulting wet vapor is fed to the column condenser. In the condenser the wet
refrigerant is dried, taking heat from the condensing process vapor. The refrigerant vapor is then
compressed and recycled to the reboiler, completing the working cycle.
If the conditions are suitable, the process fluid can be used as the working fluid for the heat
pump. This arrangement is shown in Figure 3.12(b). The hot process liquid at high pressure is
expanded over the throttle valve and fed to the condenser, to provide cooling to condense the vapor
from the column. The vapor from the condenser is compressed and returned to the base of the
column. In an alternative arrangement, the process vapor is taken from the top of the column,
compressed, and fed to the reboiler to provide heating.
3.4 Waste Stream Combustion 123
Feed
Reboiler
(a)
Condenser
Expansion
valve
Compressor
Liquid
(b)
Vapor
Low
pressure
High
pressure
FIGURE 3.12
Distillation column with heat pump: (a) separate refrigerant circuit; (b) using column fluid as the refrigerant.
The "efficiency" of a heat pump is measured by the heat pump coefficient of performance, COPh:
COPh=
energy delivered at higher temperature
energy input to the compressor
(3.4)
The COPh depends principally on the working temperatures. Heat pumps are more efficient
(higher COPh) when operated over a narrow temperature range. They are thus most often encoun-
tered on distillation columns that separate close-boiling compounds. Note that the COPh of a heat
pump is not the same as the COP of a refrigeration cycle (Section 3.2.6).
The economics of the application of heat pumps in the process industries is discussed by
Holland and Devotta (1986). Details of the application of heat pumps in a wide range of industries
are given by Moser and Schnitzer (1985).
3.4 WASTE STREAM COMBUSTION
Process waste products that contain significant quantities of combustible material can be used as
low-grade fuels, for raising steam or direct process heating. Their use will only be economic if the
intrinsic value of the fuel justifies the cost of special burners and other equipment needed to burn
the waste. If the combustible content of the waste is too low to support combustion, the waste must
be supplemented with higher calorific value primary fuels.
124 CHAPTER 3 Utilities and Energy Efficient Design
3.4.1 Reactor Off-gases
Reactor off-gases (vent gas) and recycle stream purges are often of high enough calorific value to
be used as fuels. Vent gases will typically be saturated with organic compounds such as solvents
and high volatility feed compounds. The calorific value of a gas can be calculated from the heats of
combustion of its constituents; the method is illustrated in Example 3.4.
Other factors which, together with the calorific value, determine the economic value of an off-
gas as a fuel are the quantity available and the continuity of supply. Waste gases are best used for
steam raising, rather than for direct process heating, as this decouples the source from the use and
gives greater flexibility.
Example 3.4: Calculation of Waste-Gas Calorific Value
The typical vent-gas analysis from the recycle stream in an oxyhydrochlorination process for the production of
dichloroethane (DCE) (British patent BP 1,524,449) is given below, percentages on volume basis.
O2 7.96, CO2 + N2 87.6, CO 1.79, C2H4 1.99, C2H6 0.1, DCE 0.54
Estimate the vent-gas calorific value.
Solution
Component calorific values, from Perry and Chilton (1973):
CO 67.6 kcal/mol = 283 kJ/mol
C2H4 372.8 = 1560.9
C2H6 337.2 = 1411.9
The value for DCE can be estimated from the heats of formation.
Combustion reaction:
C2H4Cl2(g) + 2O2(g) → 2CO2(g) + H2O(g) + 2HCl(g)
The heats of formation ΔΗ͂ are given in Appendix C, which is available in the online material at booksite
.Elsevier.com/Towler.
CO2-393.8 kJ/mol
H2O = -242.0
HCl = -92.4
DCE=-130.0
ΔΗ = ΣΔΗ products – ΣΔΗ reactants
= [2(-393.8) - 242.0 + 2(-92.4)] - [-130.0]
= -1084.4 kJ
Estimation of vent-gas calorific value, basis 100 mol.
Component
mol/100 mol
Calorific Value
Heating Value (kJ/mol)
CO
1.79
X
283.0
=
506.6
C2H4
1.99
1560.9
3106.2
C2H6
0.1
1411.9
141.2
DCE
0.54
1084.4
585.7
Total
4339.7
3.4 Waste Stream Combustion 125
Formaldehyde off-gas
Oxychlorination
vent fume
VCM waste fume
Liquid
chlorinated H.C.
Mono-chem.
fume
Nat. gas
1090 °C
min.
Fume
incinerator
Combustion
air
Steam
NaOH
soln.
Feed water
88 °C
85 °C
H2O
316°C
Waste heat
boiler
Primary
scrubber
Secondary
scrubber
HCL
soln.
FIGURE 3.13
Typical incinerator-heat recovery-scrubber system for vinyl-chloride-monomer process waste. (Courtesy of
John Thurley Ltd.)
Calorific value of vent gas
4339.7
100
43.4
22.4
43.4 kJ/mol
× 10³ = 1938 kJ/m³ (52 Btu/ft³) at 1 bar, 0°C
This calorific value is very low compared to 37 MJ/m³ (1000 Btu/ft³) for natural gas. The vent gas is
barely worth recovery, but if the gas has to be burnt to avoid pollution it could be used in an incinerator such
as that shown in Figure 3.13, giving a useful steam production to offset the cost of disposal.
3.4.2 Liquid and Solid Wastes
Combustible liquid and solid waste can be disposed of by burning, which is usually preferred to
dumping. Incorporating a steam boiler in the incinerator design will enable an otherwise unproduc-
tive, but necessary, operation to save energy. If the combustion products are corrosive, corrosion-
resistant materials will be needed, and the flue gases must be scrubbed to reduce air pollution. An
incinerator designed to handle chlorinated and other liquid and solid wastes is shown in Figure
3.13. This incinerator incorporates a steam boiler and a flue-gas scrubber. The disposal of chlori-
nated wastes is discussed by Santoleri (1973).
126 CHAPTER 3 Utilities and Energy Efficient Design
Dunn and Tomkins (1975) discuss the design and operation of incinerators for process wastes.
They give particular attention to the need to comply with the current clean-air legislation, and the
problem of corrosion and erosion of refractories and heat-exchange surfaces.
3.5 HEAT-EXCHANGER NETWORKS
The design of a heat-exchanger network for a simple process with only one or two streams that
need heating and cooling is usually straightforward. When there are multiple hot and cold streams,
the design is more complex and there may be many possible heat exchange networks. The design
engineer must determine the optimum extent of heat recovery, while ensuring that the design is
flexible to changes in process conditions and can be started up and operated easily and safely.
In the 1980s, there was a great deal of research into design methods for heat-exchanger networks;
see Gundersen and Naess (1988). One of the most widely applied methods that emerged was a set of
techniques termed pinch technology, which was developed by Bodo Linnhoff and his collaborators at
ICI, Union Carbide, and the University of Manchester. The term derives from the fact that in a plot
of the system temperatures versus the heat transferred, a pinch usually occurs between the hot stream
and cold stream curves, see Figure 3.19. It has been shown that the pinch represents a distinct thermo-
dynamic break in the system and that, for minimum energy requirements, heat should not be trans-
ferred across the pinch, Linnhoff et al. (1982).
In this section the fundamental principles of the pinch technology method for energy integration
will be outlined and illustrated with reference to a simple problem. The method and its applications
are described fully in a guide published by the Institution of Chemical Engineers, Kemp (2007); see
also Douglas (1988), Smith (2005), and El-Halwagi (2006).
3.5.1 Pinch Technology
The development and application of the method can be illustrated by considering the problem of reco-
vering heat between four process streams: two hot streams that require cooling, and two cold streams
that must be heated. The process data for the streams is set out in Table 3.1. Each stream starts from
a source temperature Ts, and is to be heated or cooled to a target temperature T₁. The heat capacity
flow rate of each stream is shown as CP. For streams where the specific heat capacity can be taken
as constant, and there is no phase change, CP will be given by
where m = mass flow-rate, kg/s
CP=mCp
Cp = average specific heat capacity between Ts and T, kJ kg-1°C−1
Table 3.1 Data for Heat Integration Problem
(3.5)
Stream
Heat Capacity Flow Rate
Number
Type
CP, kW/°C
T°C
T°C
Heat Load, kW
1
hot
3.0
180
60
360
2
hot
1.0
150
30
120
3
cold
2.0
20
135
230
4
cold
4.5
80
140
270
3.5 Heat-exchanger Networks 127
The heat load shown in the table is the total heat required to heat, or cool, the stream from the
source to the target temperature.
There is clearly scope for energy integration between these four streams. Two require heating
and two cooling, and the stream temperatures are such that heat can be transferred from the hot to
the cold streams. The task is to find the best arrangement of heat exchangers to achieve the target
temperatures.
Simple Two-stream Problem
Before investigating the energy integration of the four streams shown in Table 3.1, the use of a
temperature-enthalpy diagram will be illustrated for a simple problem involving only two streams.
The general problem of heating and cooling two streams from source to target temperatures is
shown in Figure 3.14. Some heat is exchanged between the streams in the heat exchanger. Addi-
tional heat, to raise the cold stream to the target temperature, is provided by the hot utility (usually
steam) in the heater; and additional cooling, to bring the hot stream to its target temperature, is pro-
vided by the cold utility (usually cooling water) in the cooler.
In Figure 3.15(a) the stream temperatures are plotted on the y-axis and the enthalpy change of
each stream on the x-axis. This is known as a temperature-enthalpy (T-H) diagram. For heat to be
exchanged, a minimum temperature difference must be maintained between the two streams. This is
shown as ATmin on the diagram. The practical minimum temperature difference in a heat exchanger
will usually be between 5 °C and 30 °C; see Chapter 19.
The slope of the lines in the T-H plot is proportional to 1/CP, since ∆H = CP × ∆T, so dT/dH=
1/CP. Streams with low heat capacity flow rate thus have steep slopes in the T-H plot and streams
with high heat capacity flow rate have shallow slopes.
The heat transferred between the streams is given by the range of enthalpy over which the two
curves overlap each other, and is shown on the diagram as ∆Hex. The heat transferred from the hot
utility, AHhot, is given by the part of the cold stream that is not overlapped by the hot stream. The
heat transferred to the cold utility, AHcold, is similarly given by the part of the hot stream that is not
overlapped by the cold stream. The heats can also be calculated as
∆H = CP × (temperature change)
Since we are only concerned with changes in enthalpy, we can treat the enthalpy axis as a rela-
tive scale and slide either the hot stream or the cold stream horizontally. As we do so, we change
T
Hot
stream
Cold
utility
T
Cold
stream
T
Exchanger
T
Hot
utility
FIGURE 3.14
Two-stream exchanger problem.
128
CHAPTER 3 Utilities and Energy Efficient Design
Hot stream
T
ATmin
! AH cold
ΔΗ ΕΧ
AH hot
H
(a)
T
Cold stream
FIGURE 3.15
Temperature-enthalpy (T-H) diagram for two-stream example.
Cost
AT min
AH cold Hex
AH hot
H
(b)
Total cost
Energy cost
Capital cost
AT optimum
Minimum approach
temperature
FIGURE 3.16
The capital-energy trade-off in process heat recovery.
the minimum temperature difference between the streams, ATmin, and also the amount of heat
exchanged and the amounts of hot and cold utilities required.
Figure 3.15(b) shows the same streams plotted with a lower value of ATmin. The amount of heat
exchanged is increased and the utility requirements have been reduced. The temperature driving force
for heat transfer has also been reduced, so the heat exchanger has both a larger duty and a smaller
log-mean temperature difference. This leads to an increase in the heat transfer area required and in the
capital cost of the exchanger. The capital cost increase is partially offset by capital cost savings in the
heater and cooler, which both become smaller, as well as by savings in the costs of hot and cold
utility. In general, there will be an optimum value of ATmin, as illustrated in Figure 3.16. This opti-
mum is usually rather flat over the range 10 °C to 30 °C.
The maximum feasible heat recovery is reached at the point where the hot and cold curves touch
each other on the T-H plot, as illustrated in Figure 3.17. At this point, the temperature driving force
at one end of the heat exchanger is zero and an infinite heat exchange surface is required, so the
design is not practical. The exchanger is said to be pinched at the end where the hot and cold
curves meet. In Figure 3.17, the heat exchanger is pinched at the cold end.
3.5 Heat-exchanger Networks 129
It is not possible for the hot and cold streams to cross each other, as this would be a violation of
the second law of thermodynamics and would give an infeasible design.
Four-stream Problem
In Figure 3.18(a) the hot streams given in Table 3.1 are shown plotted on a temperature-enthalpy
diagram.
As the diagram shows changes in the enthalpy of the streams, it does not matter where a particu-
lar curve is plotted on the enthalpy axis; as long as the curve runs between the correct temperatures.
This means that where more than one stream appears in a temperature interval, the stream heat
capacities can be added to form a composite curve, as shown in Figure 3.18(b).
T
AH cold Hex
AHhot
H
FIGURE 3.17
Maximum feasible heat recovery for two-stream example.
200
180
160
140
120
Stream 1
Stream 1
CP=3.0
100
80
Streams 1+2
CP=3.0+1.0=4.0
60
40
Stream 2 CP=1.0 kW/°C
20
0
0 100 200 300 400 500 600
0
100 200 300 400 500 600
-Enthalpy, kW-
(a)
-Enthalpy, kW
(b)
FIGURE 3.18
Hot stream temperature v. enthalpy: (a) separate hot streams; (b) composite hot stream.
130
CHAPTER 3 Utilities and Energy Efficient Design
-Temperature, °C
200
Hot utility
50 kW
180
160
140
120
Hot streams
Cold streams
100
Pinch
80
ATmin = 10 °C
60
40
20
30 kW
Cold utility
0
0
100
200
300
400
500 600
Enthalpy, kW
FIGURE 3.19
Hot and cold stream composite curves.
In Figure 3.19, the composite curve for the hot streams and the composite curve for the cold
streams are drawn with a minimum temperature difference, the displacement between the curves, of
10 °C. This implies that in any of the exchangers to be used in the network the temperature differ-
ence between the streams will not be less than 10 °C.
As for the two-stream problem, the overlap of the composite curves gives a target for heat
recovery, and the displacements of the curves at the top and bottom of the diagram give the hot and
cold utility requirements. These will be the minimum values needed to satisfy the target tempera-
tures. This is valuable information. It gives the designer target values for the utilities to aim for
when designing the exchanger network. Any design can be compared with the minimum utility
requirements to check if further improvement is possible.
In most exchanger networks the minimum temperature difference will occur at only one point.
This is termed the pinch. In the problem being considered, the pinch occurs at between 90 °C on
the hot stream curve and 80 °C on the cold stream curve.
For multi-stream problems, the pinch will usually occur somewhere in the middle of the compo-
site curves, as illustrated in Figure 3.19. The case when the pinch occurs at the end of one of the
composite curves is termed a threshold problem and is discussed in Section 3.5.5.
Thermodynamic Significance of the Pinch
The pinch divides the system into two distinct thermodynamic regions. The region above the pinch
can be considered a heat sink, with heat flowing into it from the hot utility, but no heat flow out of
it. Below the pinch the converse is true. Heat flows out of the region to the cold utility. No heat
flows across the pinch, as shown in Figure 3.20(a).
3.5 Heat-exchanger Networks 131
AHhot+AHxp
TA
AH hot
T
ΔΗ
1xp
AH cold
ΔΗcold + ΔΗxp
H
H
(a)
(b)
FIGURE 3.20
Pinch decomposition.
If a network is designed in which heat is transferred from any hot stream at a temperature above
the pinch (including hot utilities) to any cold stream at a temperature below the pinch (including cold
utilities), then heat is transferred across the pinch. If the amount of heat transferred across the pinch is
ΔΗxp, then in order to maintain energy balance the hot utility and cold utility must both be increased
by AHxp, as shown in Figure 3.20(b). Cross-pinch heat transfer thus always leads to consumption of
both hot and cold utilities that is greater than the minimum values that could be achieved.
The pinch decomposition is very useful in heat-exchanger network design, as it decomposes the
problem into two smaller problems. It also indicates the region where heat transfer matches are
most constrained, at or near the pinch. When multiple hot or cold utilities are used there may be
other pinches, termed utility pinches, that cause further problem decomposition. Problem decompo-
sition can be exploited in algorithms for automatic heat-exchanger network synthesis.
3.5.2 The Problem Table Method
The problem table is a numerical method for determining the pinch temperatures and the minimum
utility requirements, introduced by Linnhoff and Flower (1978). It eliminates the sketching of com-
posite curves, which can be useful if the problem is being solved manually. It is not widely used in
industrial practice any more, due to the wide availability of computer tools for pinch analysis (see
Section 3.5.7).
The procedure is as follows:
1. Convert the actual stream temperatures Tact into interval temperatures Tint by subtracting half the
minimum temperature difference from the hot stream temperatures, and by adding half to the
cold stream temperatures:
hot streams Tint = Tact
cold streams Tint = Tact +
ATmin
2
ΔΤ
min
2
132
CHAPTER 3 Utilities and Energy Efficient Design
The use of the interval temperature rather than the actual temperatures allows the minimum
temperature difference to be taken into account. ATmin = 10 °C for the problem being consid-
ered; see Table 3.2.
2. Note any duplicated interval temperatures. These are bracketed in Table 3.2.
3. Rank the interval temperatures in order of magnitude, showing the duplicated temperatures only
once in the order; see Table 3.3.
4. Carry out a heat balance for the streams falling within each temperature interval.
For the nth interval:
ΔΗ = (ΣCP – ΣCPh) (ΔΤη)
where ∆H = net heat required in the nth interval
ECP = sum of the heat capacities of all the cold streams in the interval
ECPh = sum of the heat capacities of all the hot streams in the interval
AT = interval temperature difference = (Tn−1 - Tn)
See Table 3.4.
5. "Cascade" the heat surplus from one interval to the next down the column of interval temperatures;
see Figure 3.21(a).
Cascading the heat from one interval to the next implies that the temperature difference is
such that the heat can be transferred between the hot and cold streams. The presence of a nega-
tive value in the column indicates that the temperature gradient is in the wrong direction and
that the exchange is not thermodynamically possible.
This difficulty can be overcome if heat is introduced into the top of the cascade:
Table 3.2 Interval Temperatures for ATmin = 10 °C
Stream
1
2
3
4
Actual Temperature
Interval Temperature
180
60
175
55
150
30
145
25
20
135
(25)
140
80
140
85
(145)
Table 3.3 Ranked Order of Interval Temperatures
Rank
175
145
140
85
55
25
Interval AT °C
Streams in Interval
30
5
55
30
30
-1
4- (2 + 1)
(3+4)(1 + 2)
3- (1+2)
3-2
Note: Duplicated temperatures are omitted. The interval AT and streams in the intervals are included as they are needed for
Table 3.4.
Table 3.4 Problem Table
3.5 Heat-exchanger Networks 133
Interval
Interval
Temp. °C
ΔΤ °C
ΣΕΡ – ΣΟP*
kW/°C
ΔΗ KW
Surplus or
Deficit
n
175
1
145
30
-3.0
-90
S
2
140
5
0.5
2.5
d
3
85
55
2.5
137.5
d
4
55
30
-2.0
-60
S
5
25
30
1.0
30
d
*Note: The streams in each interval are given in Table 3.3.
Interval
temp.
0 kW
50 kW
175°C
145°C
-90 kW
-90 kW
90 kW
140 kW
2.5 kW
2.5 kW
140°C
87.5 kW
135.5 kW
137.5 kW
137.5 kW
85 °C
-50 kW
0.0 kW
-60 kW
-60 kW
55 °C
10 kW
60 kW
30 kW
30 kW
25 °C
-20 kW
30 kW
(a)
From (b) pinch occurs at interval temperature 85°C.
FIGURE 3.21
Heat cascade.
(b)
6. Introduce just enough heat to the top of the cascade to eliminate all the negative values; see
Figure 3.21(b).
Comparing the composite curve, Figure 3.19, with Figure 3.21(b) shows that the heat intro-
duced to the cascade is the minimum hot utility requirement and the heat removed at the bottom
is the minimum cold utility required. The pinch occurs in Figure 3.21(b) where the heat flow in
the cascade is zero. This is as would be expected from the rule that for minimum utility require-
ments no heat flows across the pinch. In Figure 3.21(b) the pinch is at an interval temperature
134 CHAPTER 3 Utilities and Energy Efficient Design
of 85 °C, corresponding to a cold stream temperature of 80 °C and a hot stream temperature of
90 °C, as was found using the composite curves.
It is not necessary to draw up a separate cascade diagram. This was done in Figure 3.21 to
illustrate the principle. The cascaded values can be added to the problem table as two additional
columns; see Example 3.5.
Summary
For maximum heat recovery and minimum use of utilities:
1. Do not transfer heat across the pinch.
2. Do not use hot utilities below the pinch.
3. Do not use cold utilities above the pinch.
3.5.3 Heat-exchanger Network Design
Grid Representation
It is convenient to represent a heat-exchanger network as a grid; see Figure 3.22. The process
streams are drawn as horizontal lines, with the stream numbers shown in square boxes. Hot streams
are drawn at the top of the grid, and flow from left to right. The cold streams are drawn at the bot-
tom, and flow from right to left. The stream heat capacities CP are shown in a column at the end
of the stream lines.
Heat exchangers are drawn as two circles connected by a vertical line. The circles connect the
two streams between which heat is being exchanged; that is, the streams that would flow through
the actual exchanger. Heaters and coolers can be drawn as a single circle, connected to the appropri-
ate utility. If multiple utilities are used then these can also be shown as streams. Exchanger duties
are usually marked under the exchanger and temperatures are also sometimes indicated on the grid
diagram.
Network Design for Maximum Energy Recovery
The analysis carried out in Figure 3.19 and Figure 3.21 has shown that the minimum utility require-
ments for the problem set out in Table 3.1 are 50 kW of the hot and 30 kW of the cold utility, and
that the pinch occurs where the cold streams are at 80 °C and the hot streams are at 90 °C.
The grid representation of the streams is shown in Figure 3.23. The vertical dotted lines repre-
sent the pinch and separate the grid into the regions above and below the pinch. Note that the hot
and cold streams are offset at the pinch, because of the difference in pinch temperature.
FIGURE 3.22
Grid representation.
Hot
stream n
n
Heater Exchanger
Cooler
Cold
stream m
3.5 Heat-exchanger Networks 135
CP
(kW/°C)
180 °C
90 °C 90°C
60 °C
1
3.0
150 °C
90 °C 90°C
30 °C
2
1.0
135 °C
80°C 80°C
20 °C
H
3
2.0
140 °C
FIGURE 3.23
Grid for four-stream problem.
80 °C
4
4.5
For maximum energy recovery (minimum utility consumption) the best performance is obtained
if no cooling is used above the pinch. This means that the hot streams above the pinch should be
brought to the pinch temperature solely by exchange with the cold streams. The network design is
therefore started at the pinch, finding feasible matches between streams to fulfill this aim. In making
a match adjacent to the pinch the heat capacity CP of the hot stream must be equal to or less than
that of the cold stream. This is to ensure that the minimum temperature difference between the
curves is maintained. The slope of a line on the temperature-enthalpy diagram is equal to the reci-
procal of the heat capacity. So, above the pinch the lines will converge if CPh exceeds CP and as
the streams start with a separation at the pinch equal to ATmin, the minimum temperature condition
would be violated. Every hot stream must be matched with a cold stream immediately above the
pinch, otherwise it will not be able to reach the pinch temperature.
Below the pinch the procedure is the same; the aim being to bring the cold streams to the pinch
temperature by exchange with the hot streams. For streams adjacent to the pinch the criterion for
matching streams is that the heat capacity of the cold stream must be equal to or greater than the
hot stream, to avoid breaking the minimum temperature difference condition. Every cold stream
must be matched with a hot stream immediately below the pinch.
Network Design Above the Pinch
CP ≤ CPC
1. Applying this condition at the pinch, stream 1 can be matched with stream 4, but not with 3.
Matching streams 1 and 4 and transferring the full amount of heat required to bring stream 1
to the pinch temperature gives
∆Hex = CP(Ts – Tpinch)
ΔHex = 3.0(180 – 90) = 270 kW
136
CHAPTER 3 Utilities and Energy Efficient Design
CP
(kW/°C)
180 °C
90°C 90°C
60 °C
1
3.0
150 °C
90°C 90°C
30 °C
2
1.0
135 °C
80°C 80°C
20 °C
H
3
2.0
50 kW
60 kW
140 °C
80°C
4
4.5
270 kW
FIGURE 3.24
Network design above the pinch.
This will also satisfy the heat load required to bring stream 4 to its target temperature:
ΔΗex = 4.5(140 – 80) = 270kW
2. Stream 2 can be matched with stream 3, while satisfying the heat capacity restriction.
Transferring the full amount to bring stream 2 to the pinch temperature:
ΔHex = 1.0(150 – 90) = 60 kW
3. The heat required to bring stream 3 to its target temperature, from the pinch temperature, is
ΔΗ = 2.0(135 – 80) = 110kW
So a heater will have to be included to provide the remaining heat load:
AHhot = 110-60 = 50 kW
This checks with the value given by the problem table, Figure 3.21(b).
The proposed network design above the pinch is shown in Figure 3.24.
Network Design Below the Pinch
CPh≥ CPC
4. Stream 4 begins at the pinch temperature, T₁ = 80 °C, and so is not available for any matches
below the pinch.
5. A match between streams 1 and 3 adjacent to the pinch will satisfy the heat capacity restriction
but not one between streams 2 and 3. So 1 is matched with 3 transferring the full amount to
bring stream 1 to its target temperature:
ΔHex = 3.0(90 – 60) = 90 kW
3.5 Heat-exchanger Networks 137
CP
ΔΗ
(kW/°C) (kW)
60°C
3.0
360
90 °C 90 °C
30°C
C
30 kW
1.0
120
20 °C
3
2.0
230
180°C
90 °C 90 °C
1
150°C
2
135°C
80 °C 80 °C
H
50 kW
60 kW
90 kW 30 kW
140°C
80 °C
270 kW
FIGURE 3.25
Proposed heat exchanger network for ATmin = 10 °C.
4
4.5
270
6. Stream 3 requires more heat to bring it to the pinch temperature; the amount needed is
ΔΗ = 2.0(80 – 20) – 90 = 30 kW
This can be provided from stream 2, as the match is now away from the pinch.
The rise in temperature of stream 3 will be given by
AT = ΔH/CP
So transferring 30 kW will raise the temperature from the source temperature to
20 + 30/2.0 = 35 °C
and this gives a stream temperature difference on the outlet side of the exchanger of
90-35-55 °C
So the minimum temperature difference condition, 10 °C, will not be violated by this match.
7. Stream 2 needs further cooling to bring it to its target temperature, so a cooler must be included;
the cooling required is
ΔΗcold = 1.0(90 – 30) – 30 = 30 kW
which is the amount of the cold utility predicted by the problem table.
The proposed network for maximum energy recovery is shown in Figure 3.25.
Stream Splitting
If the heat capacities of streams are such that it is not possible to make a match at the pinch without
violating the minimum temperature difference condition, then the heat capacity can be altered by
splitting a stream. Dividing the stream will reduce the mass flow rates in each leg and hence the
heat capacities. This is illustrated in Example 3.5.
138 CHAPTER 3 Utilities and Energy Efficient Design
Similarly, if there are not enough streams available to make all of the required matches at the
pinch then streams with large CP can be split to increase the number of streams.
Guide rules for stream matching and splitting are given in the Institution of Chemical Engineers
Guide, Kemp (2007) and by Smith (2005).
Summary
The guide rules for devising a network for maximum heat recovery are given below:
1. Divide the problem at the pinch.
2. Design away from the pinch.
3. Above the pinch match streams adjacent to the pinch, meeting the restriction
CPh≤CPc
4. Below the pinch match streams adjacent to the pinch, meeting the restriction
CP≥ CP
5. If the stream matching criteria cannot be satisfied, split a stream.
6. Maximize the exchanger heat loads.
7. Supply external heating only above the pinch and external cooling only below the pinch.
3.5.4 Minimum Number of Exchangers
The network shown in Figure 3.25 was designed to give the maximum heat recovery, and will
therefore give the minimum consumption, and cost, of the hot and cold utilities.
This will not necessarily be the optimum design for the network. The optimum design will be
that which gives the lowest total annualized cost, taking into account the capital cost of the system,
in addition to the utility and other operating costs. The number of exchangers in the network, and
their size, will determine the capital cost.
In Figure 3.25 it is clear that there is scope for reducing the number of exchangers. The 30 kW
exchanger between streams 2 and 3 can be deleted and the heat loads of the cooler and heater increased
to bring streams 2 and 3 to their target temperatures. Heat would cross the pinch and the consumption
of the utilities would be increased. Whether the revised network would be better, or more economic,
depends on the relative cost of capital and utilities and the operability of each design. For any network,
there will be an optimum design that gives the least annual cost: capital charges plus utility and other
operating costs. The estimation of capital and operating costs are covered in Chapters 7 and 8.
To find the optimum design it is necessary to cost a number of alternative designs, seeking a
compromise between the capital costs, determined by the number and size of the exchangers, and
the utility costs, determined by the heat recovery achieved.
For simple networks Holmann (1971) has shown that the minimum number of exchangers is
given by
Zmin = N'-1
where Zmin = minimum number of exchangers needed, including heaters and coolers
N' = the number of streams, including the utilities
(3.6)
3.5 Heat-exchanger Networks 139
1
2
H
C
3
4
FIGURE 3.26
Loop in network.
For complex networks a more general expression is needed to determine the minimum number
of exchangers:
Zmin = N' + L' - S
where L' = the number of internal loops present in the network
S = the number of independent branches (subsets) that exist in the network
(3.7)
A loop exists where a closed path can be traced through the network. There is a loop in the net-
work shown in Figure 3.25. The loop is shown in Figure 3.26. The presence of a loop indicates
that there is scope for reducing the number of exchangers.
For a full discussion of Equation 3.7 and its applications see Linnhoff, Mason, Wardle (1979),
Smith (2005), or Kemp (2007).
In summary, to seek the optimum design for a network:
1. Start with the design for maximum heat recovery. The number of exchangers needed will be
equal to or less than the number for maximum energy recovery.
2. Identify loops that cross the pinch. The design for maximum heat recovery will usually contain
loops.
3. Starting with the loop with the least heat load, break the loops by adding or subtracting heat.
4. Check that the specified minimum temperature difference ATmin has not been violated. If the
violation is significant, revise the design as necessary to restore ATmin. If the violation is small
then it may not have much impact on the total annualized cost and can be ignored.
5. Estimate the capital and operating costs, and the total annual cost.
6. Repeat the loop breaking and network revision to find the lowest cost design.
7. Consider the safety, operability, and maintenance aspects of the proposed design.
3.5.5 Threshold Problems
Problems that show the characteristic of requiring only either a hot utility or a cold utility (but not
both) over a range of minimum temperature differences, from zero up to a threshold value, are
known as threshold problems. A threshold problem is illustrated in Figure 3.27.
140
CHAPTER 3 Utilities and Energy Efficient Design
T
AHhot
AT min
= Threshold
ΔΗcold=0
H
FIGURE 3.27
Threshold problem.
To design the heat-exchanger network for a threshold problem, it is normal to start at the most
constrained point. The problem can often be treated as one half of a problem exhibiting a pinch.
Threshold problems are often encountered in the process industries. A pinch can be introduced
in such problems if multiple utilities are used, as in the recovery of heat to generate steam, or if the
chosen value of ATmin is greater than the threshold value.
The procedures to follow in the design of threshold problems are discussed by Smith (2005) and
Kemp (2007).
3.5.6 Determining Utility Consumption
Pinch analysis can be used to determine targets for process utility consumption. Initial targets for
total hot and cold utility use can be calculated directly from the problem table algorithm or read
from the composite curves. A more detailed breakdown of the utility needs can be determined from
the initial heat-exchanger network.
The following guidelines should be followed when using the pinch method to determine utility
consumption targets:
1. Do not use cold utilities above the pinch temperature. This means that no process stream should
be cooled from a temperature above the pinch temperature using a cold utility.
2. Do not use hot utilities below the pinch. This means no process stream should be heated from a
temperature below the pinch temperature using a hot utility.
3. On either side of the pinch, maximize use of the cheapest utility first. Above the pinch this
means use LP steam wherever possible before considering MP steam, then HP steam, hot oil,
etc. Below the pinch, maximize use of cooling water before considering refrigeration.
4. If the process pinch is at a high temperature, consider boiler feed water preheat and steam
generation as potential cold utility streams.
5. If the process pinch is at a low temperature, consider steam condensate and spent cooling water
as hot streams.
6. If the process requires cooling to a very low temperature, consider using cascaded refrigeration
cycles to improve the overall COP.
7. If the process requires heating to a very high temperature and a fired heater is needed, consider
using the convective section heat either for process heating or for steam generation. For process
control reasons, it may be necessary to operate the heater with process heating in the radiant
section only, but the convective section heat is still available for use. In strict pinch terms, this
heat can be used at any temperature above the pinch temperature, but in practice convective
section heat recovery is usually limited by the acid-gas dew point of the flue gas or other
furnace design considerations (see Section 19.17).
8. If a process condition leads to the use of a more expensive utility, then consider process
modifications that would make this unnecessary. For example, if a product must be cooled and
sent to storage at 30 °C, the cooling cannot be carried out using cooling water and refrigeration
must be used. The designer should question why 30 °C was specified for the storage. If it was
because a vented tank was selected, then choosing a non-vented (floating roof) tank instead
might allow the product to be sent to storage at 40 °C, in which case the refrigeration system
could be eliminated.
Graphical methods and numerical approaches have been developed to assist in the optimal
design of utility systems. For simple problems, these methods are not needed, as the heaters and
coolers that have been identified in the heat-exchange network can be assigned to the appropriate
utility stream using the simple rules above. When a stream requires heating or cooling over a broad
temperature range, the designer should consider whether it is cheaper to break the duty into several
exchangers, each served by the appropriate utility for a given temperature range, or whether it
makes more economic sense to use a single exchanger, served by the hottest or coldest utility. The
problem of placing multiple utilities is illustrated in Example 3.6.
3.5.7 Process Integration: Integration of Other Process Operations
The pinch technology method can give many other insights into process synthesis, beyond the
design of heat-exchanger networks. The method can also be applied to the integration of other pro-
cess units, such as separation columns, reactors, compressors and expanders, boilers, and heat
pumps. The wider applications of pinch technology are discussed in the Institution of Chemical
Engineers Guide, Kemp (2007) and by El-Halwagi (2006) and Smith (2005).
The techniques of process integration have been expanded for use in optimizing mass transfer
operations, and have been applied in waste reduction, water conservation, and pollution control; see
El-Halwagi (1997) and Dunn and El-Halwagi (2003).
3.5.8 Computer Tools for Heat-exchanger Network Design
Most pinch analysis in industry is carried out using commercial pinch analysis software. Programs
such as Aspen HX-NetTM (Aspen Technology Inc.), SUPERTARGETTM (Linnhoff March Ltd.) and
UniSim™™ ExchangerNetTM (Honeywell International Inc.) allow the design engineer to plot compo-
site curves, optimize ATmin, set targets for multiple utilities, and design the heat-exchanger
network.
142 CHAPTER 3 Utilities and Energy Efficient Design
Most of these programs are able to automatically extract stream data from process simulation
programs, although great care should be taken to check the extracted data. There are many possible
pitfalls in data extraction; for example, not recognizing changes in the CP of a stream or partial
vaporization or condensation of a stream, any of which could lead to a kink in the stream T-H
profile. See Smith (2005) or Kemp (2007) for more information on data extraction.
The commercial pinch technology tools also usually include automatic heat-exchanger network
synthesis features. The automatic synthesis methods are based on MINLP optimization of super-
structures of possible exchanger options (see Chapter 12 for discussion of MINLP methods). These
tools can be used to arrive at a candidate network, but the optimization must be properly con-
strained so that it does not introduce a large number of stream splits and add a lot of small exchan-
gers. Experienced designers seldom use automatic heat-exchanger network synthesis methods, as it
usually requires more effort to turn the resulting network into something practical than it would
take to design a practical network manually. The NLP optimization capability of the software is
widely used though, for fine tuning the network temperatures by exploitation of loops and stream
split ratios.
Example 3.5
Determine the pinch temperatures and the minimum utility requirements for the streams set out in the table
below, for a minimum temperature difference between the streams of 20 °C. Devise a heat-exchanger network
to achieve the maximum energy recovery.
Stream
Number
Type
Heat
Capacity
Flow Rate,
kW/°C
Source
Temp. °C
Target
Temp. °C
Heat
Load, kW
1
hot
40.0
180
40
5600
2
hot
30.0
150
60
1800
3
cold
60.0
30
180
9000
4
cold
20.0
80
160
1600
Solution
The problem table to find the minimum utility requirements and the pinch temperature can be built in a spread-
sheet. The calculations in each cell are repetitive and the formula can be copied from cell to cell using the cell
copy commands. A spreadsheet template for the problem table algorithm is available in MS Excel format in
the online material at booksite.Elsevier.com/Towler. The use of the spreadsheet is illustrated in Figure 3.28 and
described below.
First calculate the interval temperatures, for ATmin = 20 °C
hot streams Tint = Tact-10 °C
cold streams Tint = Tact +10 °C
Company Name
Address
Form XXXXX-YY-ZZ
PROBLEM TABLE ALGORITHM
1. Minimum temperature approach
Tmin
2. Stream data
20 °C
Project Name
Project Number
REV
DATE
BY
APVD
REV
Sheet
DATE
1 of 1
BY
APVD
Actual temperature (°C)
Interval temperature (°C)
Stream No.
1
Source
Target
Source
Target
Heat capacity flow
rate CP (kW/°C)
Heat load
(kW)
180
40
170
30
40
5600
23456
150
60
140
50
30
2700
30
180
40
190
60
9000
80
160
90
170
20
1600
0
6
7
8
0000
3. Problem table
Interval
Interval temp
Interval
(°C)
T (°C)
Sum CPc sum CP
(kW/°C)
dH
Cascade
(kW)
(kW)
(kW)
1234567
190
0
2900
170
20
170
0
140
30
60 60 40
1200
1200
1700
0
1200
1700
1200
2400
500
90
50
10
500
2900
0
50
40
10
400
2500
400
40
10
20
200
2700
200
30
10
40
400
2300
600
8
FIGURE 3.28
Problem table algorithm spreadsheet.
3.5 Heat-exchanger Networks
143
144 CHAPTER 3 Utilities and Energy Efficient Design
Actual Temp. °C
Interval Temp. °C
Stream
Source
Target
Source
Target
1
180
40
170
30
2
150
60
140
50
3
30
180
40
190
4
80
160
90
170
In the spreadsheet this can be done by using an IF function to determine whether the source temperature
is lower than the target temperature, in which case the stream is a cold stream and should have ATmin/2
added.
Next rank the interval temperatures, ignoring any duplicated values. In the spreadsheet this is done using
the LARGE function. Determine which streams occur in each interval. For a stream to be present in a given
interval the largest stream interval temperature must be greater than the lower end of the interval range and the
lowest stream interval temperature must also be greater than or equal to the lower end of the interval range.
This can be calculated in the spreadsheet using IF, AND, and OR functions. Once the streams in each interval
have been determined it is possible to calculate the combined stream heat capacities. These calculations are not
strictly part of the problem table, so they have been hidden in the spreadsheet (in columns to the right of the
table).
The sum of CP values for the cold streams minus that for the hot streams can then be multiplied by the
interval AT to give the interval AH, and the interval ΔΗ values can be cascaded to give the overall heat flow.
The amount of heat that must be put in to prevent the heat flow from becoming negative is the lowest value in
the column, which can be found using the SMALL function. The final column then gives a cascade showing
only positive values, with zero energy cascading at the pinch temperature.
In the last column 2900 kW of heat have been added to eliminate the negative values in the previous
column; so the hot utility requirement is 2900 kW and the cold utility requirement, the bottom value in the
column, is 600 kW.
The pinch occurs where the heat transferred is zero, that is at interval number 4, interval temperature 90 °C.
So at the pinch hot streams will be at
and the cold streams will be at
90+10=100 °C
90-10-80 °C
Note that in the table both stream 1 and stream 4 had an interval temperature of 170 °C, which led to a
duplicate line in the list of ranked interval temperatures. Strictly, this line could have been eliminated, but
since it gave a zero value for the AT, it did not affect the calculation. The programming of the spreadsheet is a
lot easier if duplicate temperatures are handled in this manner.
To design the network for maximum energy recovery, start at the pinch and match streams, following the
rules on stream heat capacities for matches adjacent to the pinch. Where a match is made, transfer the maxi-
mum amount of heat.
The proposed network is shown in Figure 3.29.
3.5 Heat-exchanger Networks 145
CP
ΔΗ
(kW/°C)
(kW)
180 °C
100 °C 100°C
40 °C
1
C
40
5600
600 kW
150 °C
100 °C 100°C
60°C
2
30
2700
800 kW
180 °C
H
80°C 80°C
3200 kW
30 °C
3
60
9000
1800 kW
H
1250 kW
160 °C
750 kW
80 °C
1200 kW
H
4
20
1600
850 kW 750 kW
FIGURE 3.29
Proposed heat-exchanger network for Example 3.5.
The methodology followed in devising this network was:
Above Pinch
1. CPh≤ CP
2. We can match stream 1 or 2 with stream 3 but neither stream can match with stream 4. This creates a problem,
since if we match stream 1 with 3 then stream 2 will not be able to make a match at the pinch. Likewise, if we
match stream 2 with 3 then stream 1 will not be able to make a match at the pinch.
3. Check the heat available in bringing the hot streams to the pinch temperature.
stream 1 ∆H = 40.0(180-100) = 3200 kW
stream 2 ∆H = 30.0(150-100) = 1500 kW
4. Check the heat required to bring the cold streams from the pinch temperature to their target temperatures.
stream 3 ∆H = 60.0(180-80) = 6000 kW
stream 4 ∆H = 20.0(160-80) = 1600 kW
5. If we split stream 3 into two branches with CP of 40.0 and 20.0, then we can match the larger branch with
stream 1 and transfer 3200 kW, which satisfies (ticks off) stream 1.
6. We now have two cold streams, both with CP of 20.0, and one hot stream (2) with CP of 30.0. We need
to split stream 2 into two branches. As an initial guess these can both have CP of 15.0. We can then
match one branch of stream 2 with the smaller branch of 4 and transfer 750 kW, and the other branch
with stream 3, also for 750 kW, which then ticks off stream 2.
7. Include a heater on the larger branch of stream 3 to bring it to its target temperature:
AHhot = 40(100) – 3200=800kW
8. Include a heater on the smaller branch of stream 3 to provide the balance of the heat required:
AHhot = 20(100) –750=1250kW
146 CHAPTER 3 Utilities and Energy Efficient Design
9. Include a heater on stream 4 to provide the balance of the heat required:
ΔΗhot = 1600-750=850 kW
Check sum of heater duties = 800 + 1250 + 850 = 2900 kW = hot utility target.
Below Pinch
10. CP ≥ CP
11. Note that stream 4 starts at the pinch temperature and so cannot provide any cooling below the pinch.
12. We cannot match stream 1 or 2 with stream 3 at the pinch.
13. Split stream 3 to reduce CP. An even split will allow both streams 1 and 2 to be matched with the split
streams adjacent to the pinch, so try this initially.
14. Check the heat available from bringing the hot streams from the pinch temperature to their target
temperatures:
stream 1 ∆H = 40.0(100-40) = 2400 kW
stream 2 ∆H = 30.0(100 – 60) = 1200 kW
15. Check the heat required to bring the cold streams from their source temperatures to the pinch
temperature:
stream 3 ∆H = 60.0(80-30) = 3000 kW
Stream 4 is at the pinch temperature
16. Note that stream 1 cannot be brought to its target temperature of 40 °C by full interchange with stream 3
as the source temperature of stream 3 is 30 °C, so ATmin would be violated. So transfer 1800 kW to one
leg of the split stream 3.
17. Check temperature at exit of this exchanger:
Temp out = 100
1800
40
= 55 °C, satisfactory
18. Provide cooler on stream 1 to bring it to its target temperature; the cooling needed is
ΔΗcold = 2400-1800=600 kW
19. Transfer the full heat load from stream 2 to second leg of stream 3; this satisfies both streams.
Note that the heating and cooling loads, 2900 kW and 600 kW, respectively, match those predicted from
the problem table.
Note also that in order to satisfy the pinch decomposition and the stream matching rules we ended up intro-
ducing a large number of stream splits. This is quite common in heat-exchanger network design. None of the
three split fractions was optimized, so substantial savings as well as simplification of the network could be pos-
sible. For example, loops exist between the branches of stream 3 and stream 1 and between the branches of
stream 3 and stream 2. With the current split ratios these loops cannot be eliminated, but with other ratios it
might be possible to eliminate one or two exchangers.
3.5 Heat-exchanger Networks 147
The introduction of multiple stream splits is often cited as a drawback of the pinch method. Stream splits can
be problematic in process operation. For example, when an oil or other multicomponent stream is heated and par-
tially vaporized, then the stream is a two-phase mixture. It is difficult to control the splitting of such streams to
give the required flow rate in each branch. Experienced designers usually constrain the network to avoid multiple
stream splits whenever possible, even if this leads to designs that have higher than minimum utility consumption.
Example 3.6
Determine the mix of utilities to use for the process introduced in Example 3.5, if the following utility streams
are available:
Utility Stream
Tsupply (°C)
Treturn (°C)
Cost
MP steam (20 bar)
212
212
$5.47/1000 lb
LP steam (6 bar)
159
159
$4.03/1000 lb
Cooling water
30
40
$0.10/1000 gal
Chilled water
10
20
$4.50/GJ
Solution
From the solution to Example 3.5, we have the following heating and cooling duties that require utilities:
Cooler on stream 1, duty 600 kW, to cool stream 1 from 55 °C to 40 °C
Heater on large branch of stream 3, duty 800 kW, to heat from 160 °C to 180 °C
Heater on small branch of stream 3, duty 1250 kW, to heat from 117.5 °C to 180 °C
Heater on stream 4, duty 750 kW, to heat from 117.5 °C to 160 °C
It is obvious by inspection that if we are to maintain an approach temperature of 20 °C, then we will need
to use MP steam and chilled water in at least some of the utility exchangers.
We can start by converting the utility costs into annual costs to provide a kW of heating or cooling, based
on an assumed 8000 hours per year of operation.
For MP steam at 20 bar:
Heat of condensation (by interpolation in steam tables) ≈ 1889 kJ/kg
1 kW = 3600×8000 kJ/yr, therefore requires 3600×8000/1889 = 15.2×103 kg/y
Annual cost per kW = 15.2×103 × 2.205 (lb/kg) ×5.47 ($/1000 lb)/1000=$183/y
Similarly for LP steam at 6 bar:
Heat of condensation (by interpolation in steam tables) ≈ 2085 kJ/kg
1 kW = 3600×8000 kJ/yr, therefore requires 3600×8000/2085 = 13.8 × 103 kg/y
Annual cost per kW = 13.8 × 103 × 2.205 (lb/kg) × 4.03 ($/1000lb)/1000=$123/y
148 CHAPTER 3 Utilities and Energy Efficient Design
For cooling water with a cooling range of 10 °C:
1 kW of cooling requires CP =1/10=0.1 kW/°C
Heat capacity of water ≈ 4.2 kJ/kg°C, so:
Annual flow rate of cooling water per kW=0.1×3600×8000/4.2=686×103 kg/y
1000 gal of water = 3785 liters and has mass roughly 3785 kg, so:
water flow rate=686×103/3785=181.2 thousand gallons per year,
which has annual cost 0.1×181.2=$18.1/y
For chilled water:
1 kW of cooling =3600×8000=28.8 × 10º kJ/y = 28.8 GJ/y
So, annual cost = 28.8 x 4.50 = $129.6/y.
It is clearly cheaper to use LP steam rather than MP steam and to use cooling water instead of chilled
water whenever it is feasible to do so.
Beginning with the design below the pinch, if we are to maintain a minimum temperature difference of
20 °C, then we cannot use cooling water below 30 + 20 = 50 °C. The lowest utility cost design would therefore
use cooling water to cool stream 1 from 55 °C to 50 °C (duty 200 kW). A second cooler would then be needed
to cool stream 1 from 50 °C to 40°C using chilled water (duty 400 kW). The annual utility cost of this design
would be 200(18.1) +400(129.6) = $55,460.
It might reasonably be argued that the utility savings from using the minimum cost of coolant do not
justify the capital cost of an extra exchanger. Two possible alternatives can be considered. If all of the cool-
ing is carried out using chilled water, then the minimum temperature difference constraint is not violated
and a single cooler of duty 600 kW can be used. The annual utility cost would be 600(129.6) = $77,760.
The use of chilled water gives larger log-mean temperature difference in the cooler, so the total surface area
required in this design is less than the sum of the areas needed for the two exchangers proposed above. The
incremental operating cost would have to be traded against the capital cost savings. Alternatively, if we jetti-
son the 20 °C minimum temperature difference and allow a 10 °C minimum temperature difference in the
cooler, then we can cool stream 1 using only cooling water in a single cooler of duty 600 kW. The annual
utility cost would be 600(18.1) = $10,860. The savings in operating cost would have to be traded against the
increased capital cost that would result from having a lower log-mean temperature difference for this
exchanger.
Turning now to the design above the pinch, LP steam cannot be used for heating any stream that is above a
temperature of 159 – 20 = 139 °C. The minimum utility cost design would therefore use the following heaters:
LP steam to heat stream 4 from 117.5 °C to 139 °C
LP steam to heat the small branch of stream 3 from 117.5 °C to 139 °C
MP steam to heat the small branch of stream 3 from 139 °C to 180 °C
MP steam to heat the large branch of stream 3 from 160 °C to 180 °C
MP steam to heat stream 4 from 139 °C to 160 °C
3.6 Energy Management in Unsteady Processes 149
Again, although this design has the minimum utility cost, other designs may be more optimal when capital
costs are also considered. For example, there is no reason why the two branches of stream 3 must be sent to
separate MP steam heaters. These two heaters could be combined, even though that violates the rule of thumb
about not mixing streams at different temperatures, as we are well away from the pinch and have already
ensured maximum use of LP steam. This modification would reduce capital cost with no increase in operating
cost, so would almost certainly be adopted. Another modification to consider would be to examine allowing a
smaller minimum temperature difference for the heaters that use LP steam. This would increase LP steam use
at the expense of more capital (reduced temperature difference in the exchangers) and so would require a trade-
off between the additional capital and the energy cost savings.
Note that by introducing the lowest cost utilities into the design we went from needing three heaters and
one cooler in Figure 3.29 to using two coolers and five heaters in the lowest utility cost design. The introduc-
tion of multiple utilities almost always leads to an increase in the number of heat exchangers needed in a
design as well as the surface area requirements, and the energy cost savings must justify the resulting increase
in capital cost.
3.6 ENERGY MANAGEMENT IN UNSTEADY PROCESSES
The energy recovery approaches described above have been for steady-state processes, where the
rate of energy generation or consumption did not vary with time. Batch and cyclic processes present
multiple challenges for energy management. The designer must not only consider the amount of
heat that must be added to or removed from the process, but also the dynamics of heat transfer.
Limitations on the rate of heat transfer often cause heating and cooling steps to become the rate-
limiting steps in determining the overall cycle time. The sequential nature of batch operations can
also reduce the possibilities for heat recovery by heat exchange, unless multiple batches are
processed in parallel and sequenced such that heat can be transferred from one batch to the next.
3.6.1 Differential Energy Balances
If a batch process is considered, or if the rate of energy generation or removal varies with time, it is
necessary to set up a differential energy balance. For batch processes, the total energy requirements
can usually be estimated by taking a single batch as the time basis for the calculation; but the maxi-
mum rate of heat generation must also be estimated to size any heat-transfer equipment needed.
A generalized differential energy balance can be written as
Energy out = Energy in + generation – consumption – accumulation
(3.8)
The energy in and energy out terms should include both heat transfer and convective heat flows,
while the generation and consumption terms include heat of mixing, heat of reaction, etc. An
unsteady state mass balance must usually be solved simultaneously with the differential energy
balance.
Most batch processing operations are carried out in the liquid phase in stirred tanks. In the sim-
plest case, heat is only added or removed when the vessel is full, and the convective heat flows can
150 CHAPTER 3 Utilities and Energy Efficient Design
be neglected. If there is no heat of reaction or mixing, then Equation 3.8 simplifies to
Rate of heat accumulation = rate of heat transfer into vessel
dT
MCp = UADT
Pdt
where M = the mass contained in the vessel, kg
m
Cp = the specific heat capacity of the vessel contents, J/kg°C
T= temperature of the vessel contents, °C
t = time, s
U = the overall heat-transfer coefficient, W/m²°C
A = heat-transfer area, m²
ATm = the mean temperature difference, the temperature driving force, °C
(3.9)
(3.10)
The mean temperature difference for heat transfer, ATm, will generally be a function of the tem-
perature of the vessel contents, T, as well as depending on the nature of the heating or cooling med-
ium (isothermal or nonisothermal) and the type of heat transfer surface used. Batch tanks are
usually heated or cooled using internal coils, jacketed vessels, or external heat exchangers. Heat
transfer to vessels is discussed in more detail in Section 19.18.
In more complex cases, it is usually a good idea to set up a dynamic simulation model of the
process. The use of dynamic simulation allows the designer to include additional heat source and
sink terms such as losses to the environment. The designer can also use the dynamic model to
investigate the interaction between the process, the heat transfer equipment, and the process control
system, and hence to develop control algorithms that ensure rapid heating or cooling but do not
cause excessive overshoot of the target temperature.
The application of differential energy balances to simple problems is illustrated in Examples 3.7
and 15.6.
3.6.2 Energy Recovery in Batch and Cyclic Processes
Most batch processes operate at relatively low temperatures, below 200 °C, where use of steam or
hot oil will give high heat transfer rates for process heating. High heat transfer rates allow shorter
heating times and enable use of internal coils and jacketed vessels, reducing the number of pieces
of equipment in the plant. If the energy cost is a very small fraction of the total cost of production
then recovering heat from the process may not be economically attractive, as the resulting increase
in capital cost will not be justified.
Many batch processes need cooling to temperatures that require some degree of refrigeration.
Fermentation processes are often operated at temperatures below 40 °C, where use of cooling water
can be problematic and chilled water or other refrigerants are used instead. Food processes often
require refrigeration or freezing of the product. Recovery of "cooling" from chilled streams is not
possible when the product must be delivered in chilled form.
Three of the most commonly used methods for recovering heat in batch and cyclic processes are
described below. Energy optimization in batch plants has been the subject of much research, and is
discussed in more detail in the papers by Vaselenak, Grossman, and Westerberg (1986), Kemp and
3.6 Energy Management in Unsteady Processes 151
Deakin (1989), and Lee and Reklaitis (1995) and the books by Smith (2005), Kemp (2007), and
Majozi (2010).
Semi-continuous Operation
The simplest approach to allow some degree of heat recovery in a batch process is to operate part
of the plant in a continuous mode. The use of intermediate accumulation tanks can allow sections
of the plant to be fed continuously or to accumulate product for batching into other operations.
Semi-continuous operation is often deployed for feed sterilizers and pasteurizers in food proces-
sing and fermentation plants. In a pasteurization operation, the feed must be heated to a target tem-
perature, held at that temperature for long enough to kill unwanted species that may be present in
the feed, and then cooled to the process temperature. The high temperature residence time is usually
obtained by passing the process fluid through a steam-traced or well-insulated pipe coil. The initial
heating of the feed can be accomplished by heat exchange with the hot fluid leaving the coil, allow-
ing the use of a smaller steam heater to reach the target temperature, as shown in Figure 3.30. This
design is common in food-processing plants, but care must be taken to ensure that there is no leak-
age across the heat exchanger, which could potentially lead to contamination of the “sterile” feed
with components from the raw feed.
Another situation where semi-continuous operation is often adopted is in the separation section
of a batch plant. Some energy-intensive separations such as distillation and crystallization are easier
to control to high recovery and tight product specifications when operated in continuous mode. In
these cases a surge tank can feed the continuous section of the plant and typical heat recovery
schemes such as feed-bottoms heat exchange can be considered.
If a batch plant is designed so that batches are transferred from one vessel to another (as
opposed to undergoing successive steps in the same vessel), then heat can be transferred between
streams as they are pumped from one vessel to the next. During the pumping operation the flow is
at a pseudo-steady state, and a heat exchanger between two streams behaves the same as a heat
exchanger in a continuous plant. Figure 3.31 shows such an arrangement in which a hot stream
flows from vessel Rl to vessel R2, while a cold stream flows from vessel R3 to vessel R4. The
flowing streams exchange heat in a heat exchanger that is shown as being countercurrent, but could
equally well be cross-flow or cocurrent if the temperatures were suitable. This arrangement is some-
times referred to as a “countercurrent” heat integration, although it should be stressed that the
exchanger can be cocurrent or cross-flow.
Raw feed
FIGURE 3.30
Heat integration of feed sterilization system.
Steam
heater
Coil
Sterilized feed
152
CHAPTER 3 Utilities and Energy Efficient Design
R1
R3
00
00
00
R2
R4
FIGURE 3.31
Stream-to-stream (“countercurrent") heat integration of batch vessels.
When stream-to-stream heat transfer is used, a high degree of heat recovery can be obtained.
The exchanger will perform well and maintain roughly constant stream outlet temperatures during
the period when the vessels are being pumped out. When the liquid level in the vessels becomes
too low for pump operation, the flow rates in the exchanger become too low for the exchanger to
function effectively. If batch-to-batch contamination is not important and there are no safety
hazards, product quality issues, or fouling concerns, then the exchanger can be isolated (“blocked
in") while the remaining tank contents are drained through bypass lines, and the exchanger is then
ready to be reused when tanks R1 and R3 are again ready to be drained. In the case where batch-
to-batch mixing is not desired, or where there are other reasons why the exchanger cannot be left
full of process fluid, provision must be made to flush, drain, and clean the exchanger once the
upstream tanks are empty.
Sequencing Multiple Batches
If a plant contains several batches that are undergoing different steps of a process at the same time,
or if several different batch plants are grouped close to each other, then the batches can sometimes
be sequenced so that heat can be transferred from one batch to another.
Suppose a batch process contains the steps of heating reagents, reacting them at a desired tem-
perature and then cooling the products before sending them for further processing. If two reactors
are used, a heat exchanger can be employed to exchange heat from the reactor that is being cooled
to the reactor that is being heated. For example, in Figure 3.32, hot fluid from vessel R5 is pumped
through an exchanger where it transfers heat to cold fluid that is pumped from vessel R6. The fluid
from each vessel is returned to the vessel that it came from. The heat exchanger in Figure 3.31 is
shown as being countercurrent, but cocurrent or cross-flow heat exchange could be used if the tem-
peratures were appropriate.
The graph on the right of Figure 3.32 is a schematic of the temperature-time profile for both vessels.
As time progresses, they become closer in temperature, and would eventually reach thermal equilibrium.
In practice, it is usually not economical to run the exchanger for very long times, and heat transfer is
R5
00
3.6 Energy Management in Unsteady Processes 153
00
8
T
R6
TR5
FIGURE 3.32
Tank-to-tank ("cocurrent") heat integration of batch vessels.
R7
R9
00
R8
A
Σ
T
AT min
TR6
ΔΤ.
min
↑
TA
TR9
TR8
t
FIGURE 3.33
Stream-to-tank ("cocurrent/countercurrent") heat integration of batch vessels.
stopped when an acceptable minimum temperature difference between the vessels is reached, shown as
ATmin in the figure. Tank-to-tank heat transfer does not allow as efficient heat recovery as stream-to-
stream, as the hottest temperatures in the hot tank are matched with the coldest temperatures in the cold
tank, as they would be in a cocurrent heat exchanger, hence Vaselenak, et al. (1986) named this type of
batch heat integration “cocurrent” heat integration. It should again be stressed that the heat exchanger is
usually designed to be countercurrent or cross-flow.
An improvement on this scheme is to use stream-to-tank heat transfer, shown in Figure 3.33,
in which a stream that is transferred from one vessel to another exchanges heat with a stream
that is returned to the tank from which it originated. In Figure 3.33, hot fluid flows from R7 to
R8 and transfers heat to a cold stream that is pumped from R9 and returned to R9. The graph on
the right of Figure 3.33 is a schematic of the temperature behavior of R9, R8, and the location
marked as A on the line entering R8. The temperature of the cold fluid in R9 increases over time
as heat is transferred to it. The temperature at A is the temperature of the hot fluid at the exit of
the heat exchanger. The heat exchanger will usually be designed to pinch at the cold end, since
the recirculating flow from R9 can be much greater than the pump-out flow from R7. Conse-
quently, the temperature at A will be equal to the temperature in R9 plus the temperature
154 CHAPTER 3 Utilities and Energy Efficient Design
approach of the heat exchanger, and so the temperature at A has a profile offset above the R9
temperature profile. The temperature in R8 is the time-averaged integral of the temperature of the
feed to the vessel, i.e., the time-averaged integral of the temperature at A. Although the fluid
entering R8 becomes hotter with time, it is mixed with an accumulating volume of colder fluid,
so the temperature in R8 does not increase so rapidly as the temperature in R9, and R8 can even
be colder than R9 when the heat transfer is complete. This process is therefore intermediate in
thermal efficiency between tank-to-tank heat transfer and stream-to-stream heat transfer. It is
sometimes known as “cocurrent/countercurrent” heat integration. The derivation of the equations
needed to accurately describe the temperature profiles for this arrangement is given by Vaselenak,
et al. (1986).
When tank-to-tank or tank-to-stream heat transfer is selected, care must be taken to ensure that
the heat exchanger doesn't cause problems when not in use. If the designer anticipates that there
could be problems with fouling, corrosion, batch-to-batch contamination, product degradation, safety
issues, or any other issue with leaving the exchanger filled, then the design must include means to
drain, flush, and clean the exchanger between batches.
When considering the use of stream-to-stream, stream-to-tank, or tank-to-tank heat transfer in a
batch process, the designer must ensure that the batch schedules allow both streams to be available
at the same time and for a sufficient time to accomplish the desired heat recovery. When draining,
flushing, and cleaning of the heat exchanger are necessary, these steps must also be taken into
account. For a process that handles multiple batches simultaneously or a site with multiple batch
plants, the resulting scheduling problem becomes too large to optimize by hand and numerical
methods must be used. See Vaselenak, et al. (1986), Kemp and Deakin (1989), and Lee and Reklaitis
(1995) for approaches to solving such problems.
Indirect Heat Recovery
An alternative method of heat recovery that can be used in batch processing is to recover heat indir-
ectly through the utility system or using a heat storage system. Although less thermally efficient than
process-to-process heat recovery, this method eliminates problems from sequencing of operations.
In indirect heat recovery, heat from a hot process stream is transferred to a utility stream, such
as a reservoir of heat-transfer fluid. The heat-transfer fluid can then be used for heating elsewhere
in the process. Indirect heat recovery can be used in any of the flow schemes described above, but
in all cases the use of an intermediate stream will reduce the thermal efficiency and the amount of
heat that can be recovered. Heat storage systems can only be used when there is a large enough
temperature difference between the process heat source and process heat sink to allow for the
thermal inefficiency of transfer of heat to the storage medium, cooling losses during storage, and
transfer of heat to the process heat sink.
Example 3.7: Differential Energy Balance
In the batch preparation of an aqueous solution, the water is first heated to 80 °C in a jacketed, agitated vessel;
1000 Imp. gal. (4545 kg) is heated from 15 °C. If the jacket area is 300 ft² (27.9 m²) and the overall heat-
transfer coefficient can be taken as 50 Btu ft®2 h−1 °F−¹ (285 W m−² K¯¹), estimate the heating time. Steam is
supplied at 25 psig (2.7 bar).
References 155
Solution
The rate of heat transfer from the jacket to the water will be given by Equation 3.10:
dT
MCP = UADT
Pdt
Since steam is used as the heating medium, the hot side is isothermal and we can write
where Ts = the steam saturation temperature.
Integrating:
Batch heating time, tp:
For this example,
AT=T-T
tB
dt =
0
B =
MCD
T2
dT
UAJ (T-T)
T1
MCP In TS-T2
UA
TS-T1
MC, = 4.18 × 4545 × 103 JK-1
UA=285×27 WK-1
T₁ = 15 °C, T2 = 80 °C, T₁ = 130 °C
4.18 × 4545 × 1031130-80
B =
In
285 x 27.9
130-15
= 1990s=33.2 min
(3.10)
In this example the heat capacity of the vessel and the heat losses have been neglected for simplicity. They
would increase the heating time by 10 to 20 percent.
References
Balmer, R. (2010). Thermodynamic tables to accompany modern engineering thermodynamics. Academic
Press.
Barnwell, J., & Morris, C. P. (1982). Heat pump cuts energy use. Hyd. Proc., 61(July), 117.
Bloch, H. P., Cameron, J. A., Danowsky, F. M., James, R., Swearingen, J. S., & Weightman, M. E. (1982).
Compressors and expanders: Selection and applications for the process industries. Dekker.
156
CHAPTER 3 Utilities and Energy Efficient Design
Buse, F. (1981). Using centrifugal pumps as hydraulic turbines. Chem. Eng., NY, 88(Jan 26th), 113.
Chada, N. (1984). Use of hydraulic turbines to recover energy. Chem. Eng., NY, 91(July 23rd), 57.
Dincer, I. (2003). Refrigeration systems and applications. Wiley.
Douglas, J. M. (1988). Conceptual design of chemical processes. McGraw-Hill.
Dryden, I. (Ed.). (1975). The efficient use of energy. IPC Science and Technology Press.
Dunn, R. F., & El-Halwagi, M. M. (2003). Process integration technology review: background and applications
in the chemical process industry. J. Chem. Technol. Biot., 78, 1011.
Dunn, K. S., & Tomkins, A. G. (1975). Waste heat recovery from the incineration of process wastes. Inst.
Mech. Eng. Conference on Energy Recovery in the Process Industries, London.
El-Halwagi, M. M. (1997). Pollution prevention through process integration: Systematic design tools.
Academic Press.
El-Halwagi, M. M. (2006). Process integration. Academic Press.
Green, D. W., & Perry, R. H. (Eds.). (2007). Perry's chemical engineers' handbook (8th ed.). McGraw-Hill.
Gundersen, T., & Naess, L. (1988). The synthesis of cost optimal heat-exchanger networks an industrial review
of the state of the art. Comp. and Chem. Eng., 12(6), 503.
Hinchley, P. (1975). Waste heat boilers in the chemical industry. Inst. Mech. Eng. Conference on Energy
Recovery in the Process Industries, London.
Holmann, E. C. (1971). PhD Thesis, Optimum networks for heat exchangers. University of South
California.
Holland, F. A., & Devotta, S. (1986). Prospects for heat pumps in process applications. Chem. Eng., London,
425(May), 61.
Jenett, E. (1968). Hydraulic power recovery systems. Chem. Eng., NY, 75(April 8th), 159, (June 17th) 257 (in
two parts).
Kemp, I. C. (2007). Pinch analysis and process integration (2nd ed.). A user guide on process integration for
efficient use of energy. Butterworth-Heinemann.
Kemp, I. C., & Deakin, A. W. (1989). The cascade analysis for energy and process integration of batch
processes. Chem. Eng. Res. Des., 67, 495.
Kenney, W. F. (1984). Energy conversion in the process industries. Academic Press.
Lee, B., & Reklaitis, G. V. (1995). Optimal scheduling of cyclic batch processes for heat integration – I. Basic
formulation. Comp. and Chem. Eng., 19(8), 883.
Linnhoff, B., & Flower, J. R. (1978). Synthesis of heat exchanger networks. AIChE J., 24(633) (in two parts).
Linnhoff, B., Mason, D. R., & Wardle, I. (1979). Understanding heat exchanger networks. Comp. and Chem.
Eng., 3, 295.
Linnhoff, B., Townsend, D. W., Boland, D., Hewitt, G. F., Thomas, B. E. A., Guy, A. R., & Marsland, R. H.
(1982). User guide on process integration for the efficient use of energy (1st ed.). London: Institution of
Chemical Engineers.
Luckenbach, E. C. (1978). U.S. 4,081,508, to Exxon Research and Engineering Co. Process for reducing flue
gas contaminants from fluid catalytic cracking regenerator.
Majozi, T. (2010). Batch chemical process integration: Analysis, synthesis and optimization. Springer.
Meili, A. (1990). Heat pumps for distillation columns. Chem. Eng. Prog., 86(6), 60.
Miles, F. D. (1961). Nitric Acid Manufacture and Uses. Oxford U.P.
Miller, R. (1968). Process energy systems. Chem. Eng., NY, 75(May 20th), 130.
Moser, F., & Schnitzer, H. (1985). Heat pumps in industry. Elsevier.
Perry, R. H., & Chilton, C. H. (Eds.). (1973). Chemical engineers handbook (5th ed.). McGraw-Hill.
Reay, D. A., & Macmichael, D. B. A. (1988). Heat pumps: Design and application (2nd ed.). Pergamon Press.
Santoleri, J. J. (1973). Chlorinated hydrocarbon waste disposal and recovery systems. Chem. Eng. Prog.,
69(Jan.), 69.
Nomenclature 157
Silverman, D. (1964). Electrical design. Chem. Eng., NY, 71(May 25th), 131, (June 22nd) 133, (July 6th) 121, (July
20th), 161 (in four parts).
Singh, J. (1985). Heat transfer fluids and systems for process and energy applications. Marcel Dekker.
Smith, R. (2005). Chemical process design and integration. Wiley.
Stoecker, W. F. (1998). Industrial refrigeration handbook. McGraw-Hill.
Trott, A. R., & Welch, T. C. (1999). Refrigeration and air conditioning. Butterworth-Heinemann.
Vaselenak, J. A., Grossman, I. E., & Westerberg, A. W. (1986). Heat integration in batch processing. Ind. Eng.
Chem. Proc. Des. Dev., 25, 357.
American and International Standards
NFPA 70. (2006). National electrical code. National Fire Protection Association.
NOMENCLATURE
Dimensions in $MLTO
L2
A
CP
CPC
CPh
Cp
ΣΕΡ
ΣΕΡ
Area
Stream heat capacity flow rate
Stream heat capacity flow rate, cold stream
Stream heat capacity flow rate, hot stream
Specific heat at constant pressure
Sum of heat capacity flow rates of cold streams
Sum of heat capacity flow rates of hot streams
ML2T-20-1
ML2T-20-1
ML2T-20-1
L2T-20-1
ML2T-20-1
ML2T-20-1
COP
COPh
dHb
H
ΔΗ
AH cold
ΔΗex
AHhot
ΔΗ
ΔΗ χρ
-ΔΗ
Coefficient of performance for a heat pump
Boiler heating rate
Enthalpy
Change in enthalpy
Heat transfer from cold utility
Heat transfer in exchanger
Heat transfer from hot utility
Net heat required in nth interval
Cross-pinch heat transfer
Standard heat of combustion
C
ΔΗ° f
Standard enthalpy of formation
hg
Specific enthalpy of steam
Coefficient of performance for a refrigeration cycle
L-2T2
ML2T-2
ML2T-2
ML2T-3
ML2T-3
ML2T-3
ML2T-3
ML2T-3
L2T-2
L2T-2
L2T-2
L'
Number of internal loops in network
M
Mass
m
Mass flow-rate
M
MT-1
N
Number of cold streams, heat-exchanger networks
N'
Number of streams
PBFW
Price of boiler feed water
$M-1
(Continued)
158
CHAPTER 3 Utilities and Energy Efficient Design
Dimensions in $MLTO
$M-1L-2T2
$M-1
PF
PHPS
Price of fuel
Price of high pressure steam
S
Number of independent branches
Sg
Specific entropy
L2T-20-1
T
Temperature, absolute
0
T
Initial temperature
0
T2
Final temperature
0
Tact
Actual stream temperature
0
Tc
Condenser temperature
0
Te
Evaporator temperature
0
Tint
Interval temperature
θ
Th
Temperature in nth interval
Tpinch
Pinch temperature
Treturn
Return temperature for utility
Ts
Source temperature
0
0
0
Tsupply
Supply temperature for utility
T
Steam saturation temperature
0
T
Target temperature
ATm
Mean temperature difference
0
ATmin
Minimum temperature difference (minimum approach) in heat exchanger
0
ΔΤη
Interval temperature difference
t
Time
tB
Batch heating time
U
Overall heat transfer coefficient
T
T
MT-30-1
Zmin
Minimum number of heat exchangers in network
ηΒ
Boiler efficiency
PROBLEMS
3.1. A process heater uses Dowtherm A heat transfer fluid to provide 850 kW of heat. Estimate
the annual operating cost of the heater if the Dowtherm evaporator is 80% efficient and the
price of natural gas is $4.60/MMBtu. Assume 8000 operating hours per year.
3.2. A site steam system consists of HP steam at 40 bar, MP steam at 18 bar, and LP steam at
3 bar. If natural gas costs $3.50/MMBtu and electricity is worth $0.07/kWh, estimate the cost
of steam at each level in $/metric ton.
3.3. Make a rough estimate of the cost of steam per ton, produced from a packaged boiler.
10,000 kg per hour of steam are required at 15 bar. Natural gas will be used as the fuel,
calorific value 39 MJ/m³ (roughly 1 MMBtu/1000 scf). Take the boiler efficiency as 80%.
No condensate will be returned to the boiler.
Problems 159
3.4. A crystallization process requires operation at -5° C. The refrigeration system can reject heat
to cooling water that is available at 35° C. If a single refrigeration cycle has an efficiency of
60% of Carnot cycle performance then estimate the cost of providing 1 kW of cooling to this
process using a single-stage cycle and using a cascaded-two stage cycle (in which the colder
cycle rejects heat to the warmer cycle). Electricity costs $0.07/kWh and the cost of cooling
water can be neglected.
3.5. A gas produced as a by-product from the carbonization of coal has the following composition,
mole %: carbon dioxide 4, carbon monoxide 15, hydrogen 50, methane 12, ethane 2, ethylene 4,
benzene 2, balance nitrogen. Using the data given in Appendix C (available online at booksite
.Elsevier.com/Towler), calculate the gross and net calorific values of the gas. Give your answer
in MJ/m³, at standard temperature and pressure.
3.6. Determine the pinch temperature and the minimum utility requirements for the process set out
below. Take the minimum approach temperature as 15 °C. Devise a heat-exchanger network
to achieve maximum energy recovery.
Stream Number
Type
Heat Capacity
kW/°C
Source Temp. °C
Target Temp. °C
1
hot
13.5
180
80
2
hot
27.0
135
45
3
cold
53.5
60
100
4
cold
23.5
35
120
3.7. Determine the pinch temperature and the minimum utility requirements for the process set out
below. Take the minimum approach temperature as 15 °C. Devise a heat-exchanger network
to achieve maximum energy recovery.
Stream Number
Type
Heat Capacity
kW/°C
Source Temp. °C
Target Temp. °C
1
hot
10.0
200
80
2
hot
20.0
155
50
3
hot
40.0
90
35
4
cold
30.0
60
100
5
cold
8.0
35
90
3.8. To produce a high purity product two distillation columns are operated in series. The over-
head stream from the first column is the feed to the second column. The overhead from the
second column is the purified product. Both columns are conventional distillation columns
fitted with reboilers and total condensers. The bottom products are passed to other processing
units, which do not form part of this problem. The feed to the first column passes through a
160 CHAPTER 3 Utilities and Energy Efficient Design
preheater. The condensate from the second column is passed through a product cooler. The
duty for each stream is summarized below:
No.
Stream
Type
Source Temp. °C.
Target Temp. °C
Duty, kW
1
Feed preheater
cold
20
50
900
2
First condenser
hot
70
60
1350
3
Second condenser
hot
65
55
1100
4
First reboiler
cold
85
87
1400
5
Second reboiler
cold
75
77
900
6
Product cooler
Hot
55
25
30
Find the minimum utility requirements for this process, for a minimum approach temperature
of 10 °C.
Note: the stream heat capacity is given by dividing the exchanger duty by the temperature
change.
3.9. At what value of the minimum approach temperature does the problem in Example 3.5
become a threshold problem? Design a heat-exchanger network for the resulting threshold
problem. What insights does this give into the design proposed in Example 3.5?`,
  ZEOLITE_FRAMEWORK_AEL: `data_AEL
_audit_creation_date          2007-06-01
_audit_creation_method        'IZA-SC'
_audit_update_record          2007-06-01

_cell_length_a                13.72
_cell_length_b                18.52
_cell_length_c                8.41
_cell_angle_alpha             90.00
_cell_angle_beta              90.00
_cell_angle_gamma             90.00
_space_group_name_H-M         'I m m a'

loop_
_atom_site_label
_atom_site_type_symbol
_atom_site_fract_x
_atom_site_fract_y
_atom_site_fract_z
T1   Si   0.25000   0.32970   0.88760
T2   Si   0.00000   0.25000   0.57340
T3   Si   0.00000   0.41310   0.72080
`,
  ZEOLITE_FRAMEWORK_AST: `data_AST
_audit_creation_date          2007-06-01
_audit_creation_method        'IZA-SC'
_audit_update_record          2007-06-01

_cell_length_a                13.62
_cell_length_b                13.62
_cell_length_c                13.62
_cell_angle_alpha             90.00
_cell_angle_beta              90.00
_cell_angle_gamma             90.00
_space_group_name_H-M         'F m -3 m'

loop_
_atom_site_label
_atom_site_type_symbol
_atom_site_fract_x
_atom_site_fract_y
_atom_site_fract_z
T1   Si   0.25000   0.25000   0.25000
`,
  ZEOLITE_FRAMEWORK_MFI: `data_MFI
_audit_creation_date          2007-06-01
_audit_creation_method        'IZA-SC'
_audit_update_record          2007-06-01

_cell_length_a                20.07
_cell_length_b                19.92
_cell_length_c                13.42
_cell_angle_alpha             90.00
_cell_angle_beta              90.00
_cell_angle_gamma             90.00
_space_group_name_H-M         'P n m a'

loop_
_atom_site_label
_atom_site_type_symbol
_atom_site_fract_x
_atom_site_fract_y
_atom_site_fract_z
T1   Si   0.41870   0.34680   0.31680
T2   Si   0.31380   0.45780   0.30150
T3   Si   0.18340   0.34750   0.32350
T4   Si   0.41430   0.35410   0.06820
T5   Si   0.31010   0.46380   0.05260
T6   Si   0.18240   0.35120   0.07360
T7   Si   0.43080   0.19830   0.33400
T8   Si   0.31750   0.08830   0.31340
T9   Si   0.18260   0.19790   0.33640
T10  Si   0.43570   0.19530   0.08380
T11  Si   0.32010   0.08210   0.06240
T12  Si   0.18620   0.19320   0.08630
`,
  PYROLYSIS_PROCESS: `
ANÁLISIS DEL CICLO DE VIDA DE LOS RESIDUOS SÓLIDOS DE LLANTAS DE
UN PROCESO DE VALORIZACIÓN A PARTIR DE CRITERIOS
SOCIOECONÓMICOS Y AMBIENTALES EN LA CIUDAD DE BOGOTÁ D.C.
Estudio por ANGIE CATALINA TRUJILLO ANGULO, 2024.

RESUMEN
En el presente estudio se desea analizar el ciclo de vida de un proceso de valorización
de llantas usadas enfocado a la ciudad de Bogotá D.C, Colombia. Se evidencia que en el proceso de valorización
pirólisis de llantas se determinan varios beneficios, donde se destacan los beneficios
ambientales y económicos reduciendo la necesidad de producir nuevos productos con
materias primas vírgenes, se recuperan materiales que pueden ser reutilizados. Los
impactos ambientales evaluados como la acidificación, ecotoxicidad, agotamiento del
ozono estratosférico, eutrofización y calentamiento global presentan un impacto
positivo al implementar este proceso.

INTRODUCCIÓN
En Colombia se producen 950.000 llantas usadas al año. El Decreto 442 de 2015 prohíbe abandonar las llantas en espacios públicos.
Dentro de la composición de las llantas se tienen metales pesados como el Zinc,
Cromo, Níquel, Plomo y Cadmio.

OBJETIVOS
Analizar el ciclo de vida de los residuos sólidos de llantas a partir de un proceso de
valorización que representa los mejores beneficios socioeconómicos y ambientales en
la ciudad de Bogotá D.C.

MARCO TEÓRICO
Composición de las llantas (Tabla 1 y 2): Una llanta es una mezcla de ~200 materiales. Los principales son caucho natural (14-22%), caucho sintético (23-27%), negro carbón (28%), y acero (13-15%). La composición química elemental incluye ~70% Carbono, 15% Hierro, 7% Hidrógeno. El poder calorífico superior está entre 25 y 30 MJ/kg.

METODOLOGIA
Se realiza un análisis de ciclo de vida (ACV) del proceso de pirólisis de llantas usadas, siguiendo las normas ISO 14040 e ISO 14044. La unidad funcional es la valorización de 1 tonelada (1000 kg) de llantas usadas.

RESULTADOS Y DISCUSIÓN
En Bogotá se generan aproximadamente 15.265.139 toneladas/año de residuos sólidos. El 7.9% de los Residuos de Construcción y Demolición (RCD) son llantas usadas.
En 2023 se generaron más de 222.000 llantas usadas desechadas indebidamente.

PROCESOS DE VALORIZACIÓN
Pirólisis: Se realiza en atmósfera anaeróbica a altas temperaturas. Produce aceite de pirólisis, pirocarbón y pirogas. Es eficiente entre 450°C y 700°C.
Reciclaje mecánico: Trituración del material para reutilizar el caucho, acero y fibras.
Co-procesamiento: Uso en hornos cementeros para aprovechar el poder calorífico.

SELECCIÓN DEL PROCESO
Mediante un modelo AHP (Proceso Analítico Jerárquico), se concluye que la pirólisis es la alternativa óptima de aplicación, a pesar de ser la más costosa, por sus beneficios ambientales y sociales.

ANÁLISIS DE CICLO DE VIDA (ACV) DE LA PIRÓLISIS
El alcance excluye la fabricación y recolección de la llanta. Se centra en el transporte a la planta, trituración y pirólisis.
Inventario para 1000 kg de llantas tratadas:
- Entradas de Trituración: 1000 kg llantas, 34 km transporte, 3.73 kg diésel, 211 kWh electricidad.
- Salidas de Trituración: 636 kg caucho para pirólisis, 269 kg chatarra metal, 95 kg residuos textiles.
- Entradas de Pirólisis: 636 kg caucho, 549 kWh electricidad, 358 kg agua, 0.114 kg aceite compresor.
- Salidas de Pirólisis (Tabla 11. Balance de masa proceso de pirólisis): 135 kg gas de pirólisis, 313 kg coque de pirólisis, 166 kg aceite de pirólisis, 16 kg agua de proceso, 358 kg agua evaporada.

EVALUACIÓN DE IMPACTOS
- Acidificación y Ecotoxicidad: El reciclaje del acero es el factor que más contribuye a la reducción de estos impactos.
- Cambio Climático: La generación de electricidad por hidroeléctrica es el segundo proceso que más aporta positivamente.
- El gas pirolítico en conjunto con el gas natural usado para la incineración es uno de los mayores aportantes a la reducción de emisiones.

VIABILIDAD ECONÓMICA
Se estima una Tasa Interna de Retorno (TIR) del 30.49%, lo cual presenta una alta rentabilidad del proceso a pesar de que su inversión inicial es elevada (Yánez Tapia, 2021).

CONCLUSIONES
La pirólisis es el proceso más viable para la valorización de llantas usadas en Bogotá, presentando mayor beneficio ambiental al generar subproductos de alto valor agregado (aceite, gas, carbón vegetal). Aunque su instalación tiene un alto costo, puede ser recuperado mediante la implementación de economía circular.

REGULACIONES MENCIONADAS (Tabla 4)
- Constitución política de Colombia de 1991 (Artículos 79 y 80).
- Ley 9 de 1979: Medidas sanitarias.
- Ley 1259 de 2008: Comparendos por mala disposición de residuos.
- Resolución 1457 de 2010: Sistemas de recolección selectiva.
- Resolución 6981 de 2011 (Secretaria distrital de movilidad): Aprovechamiento de llantas.
- Decreto 442 de 2015 (Alcaldía Mayor de Bogotá): Crea el Programa de aprovechamiento y/o valorización de llantas usadas en el Distrito Capital.
- Acuerdo 602 de 2015: Plan estratégico para el manejo.
- Conpes 3874 de 2016: Política nacional para la gestión integral de residuos sólidos.
- Decreto 265 de 2016: Modifica el decreto 442 de 2015.
- Resolución 1326 de 2017: Establece los sistemas de recolección selectiva y gestión ambiental de llantas usadas.
`,
  COMPARATIVE_ANALYSIS: `
Análisis Comparativo de las Propiedades del Aceite de Pirólisis

La ficha técnica que ha proporcionado representa el "estándar de oro" técnico para el aceite de pirólisis. Al analizar cada propiedad, podemos cuantificar la "prima de pureza de la materia prima" y comprender mejor las concesiones entre el coste de la materia prima y la calidad del producto final.

1. Poder Calorífico Superior (PCS): 46.2 MJ/kg
Este valor es excepcionalmente alto y se alinea con el extremo superior del rango reportado para aceites de pirólisis de plásticos, que generalmente se sitúa entre 41 y 46 MJ/kg.
Comparación Estratégica: Este poder calorífico es prácticamente equivalente al de los combustibles diésel y gasolinas convencionales (típicamente 42-46 MJ/kg). Es significativamente superior al del aceite de pirólisis derivado de biomasa (como la madera de pino), cuyo PCS raramente supera los 27 MJ/kg. Esto confirma que el aceite de HDPE es un combustible líquido de muy alta densidad energética.

2. Densidad: 790 kg/m³
La densidad indicada se encuentra dentro del rango esperado para aceites de pirólisis de poliolefinas.
Comparación Estratégica: Esta densidad es similar a la de los combustibles diésel ligeros (aproximadamente 820-850 kg/m³) y la gasolina. Esto es favorable, ya que indica un producto líquido de hidrocarburos relativamente ligero, lo que facilita su bombeo, transporte y eventual integración en una refinería.

3. pH: 7 (Neutral)
Un pH neutro es una desviación drástica y muy beneficiosa en comparación con otros tipos de aceites de pirólisis.
Comparación Estratégica: El aceite de pirólisis de biomasa es notoriamente ácido (pH 2-3), lo que lo hace altamente corrosivo. Incluso los aceites de plásticos mixtos pueden tener un pH ligeramente ácido (en torno a 5.5). Un pH neutro, como el indicado para el aceite de HDPE puro, implica:
- Menor Corrosividad: Se pueden utilizar materiales de construcción más económicos (como el acero al carbono).
- Mayor Estabilidad: La ausencia de compuestos oxigenados ácidos reduce drásticamente las reacciones de polimerización que aumentan la viscosidad.
- Mejora Simplificada: El proceso de hidrotratamiento (upgrading) se simplifica.

Conclusión: La Disyuntiva Estratégica entre la Pureza de la Materia Prima y la Realidad Económica
La ficha técnica describe un producto ideal. Sin embargo, esto pone de relieve la disyuntiva central:
1. Ruta de Materia Prima Pura (HDPE): Ventajas (aceite de alta calidad, upgrading simple), Desventajas (desafío logístico y económico, compite con reciclaje mecánico).
2. Ruta de Materia Prima Mixta (Residuos no reciclables): Ventajas (abundante, coste bajo o negativo), Desventajas (menor rendimiento y calidad, upgrading más complejo y costoso).

En resumen, la ficha técnica del aceite de HDPE sirve como un punto de referencia crucial para cuantificar el "premio" asociado al uso de una materia prima de alta pureza.
`,
  TECHNICAL_DATA_SHEET: `
### FICHA TÉCNICA DE PROCESO: Aceite de Mejora de Aceite de Cocina Usado
**Producto:** Aceite de Mejora de Aceite de Cocina Usado
**Categoría:** Aceite de Pirólisis de Lípidos Avanzado
**Fase:** Líquido Homogéneo

**Parámetros Clave & Ventaja Competitiva:**
- **Poder Calorífico Superior (PCS):** 41 MJ/kg. **Energía Competitiva**: Notable, a la par o por encima de combustibles como el diésel (42-45 MJ/kg). Permite explorar aplicaciones de alta densidad energética.
- **Densidad:** 880 kg/m³. **Manejabilidad Premium**: Muy cercano al biodiésel, facilita compatibilidad con infraestructuras existentes, reduciendo costos de adaptación.
- **pH:** 6. **Estabilidad Química & Menor Corrosividad**: Cerca de la neutralidad. Minimiza el riesgo de corrosión en tanques y motores, reduciendo costos de mantenimiento y aumentando la vida útil.
- **Categoría:** Aceite de Pirólisis de Lípidos. **Innovación Sostenible con Base Lipídica**: Destaca su origen en aceites y grasas. Material con alta densidad energética y perfil químico único.
- **Fase:** Líquido. **Versatilidad Operacional**: Integración sin complicaciones en sistemas existentes. Permite bombeo, mezcla y dosificación sencillos.
- **Tipo de Aceite:** Aceite de Cocina Usado. **Optimización de Residuos**: Transforma un residuo (ACU) en un recurso de alto valor, posicionando a la empresa como líder en soluciones sostenibles y economía circular.
`,
  ECO_HORNET_TECHNOLOGY: `
eco HORNET
Innovative Technologies for Ecological and Efficient Pyrolysis of Waste Treatment
Waste to Bioeconomy (W2B) treatment station for soil and air depollution
Sustainable Business Models for Circular Economy in Rural and Urban Communities
W2B Recycling ECO STATION
Best Available Technology
High quality units for Biofuels & Bioenergy production
Author: Mr. Iuliean HORNET, Inventor
S.C. Ecohornet S.R.L. Romania

ECOHORNET SRL is a company specialized in manufacturing of W2E equipment for the high-performance production of thermal energy and biofuels. The company develops optimized processes of energy conversion and heat transfer to produce thermal agent in the form of hot water, superheated water, steam, diathermic oil, hot air, thermal radiation, pyrolysis, biofuels treatment stations. ecoHORNET burners use for termo chemical pyrolysis thermal energy from biofuel and residual recovery syngas energy, not forestry wood or white pellets.

Products from Pyrolysis Installation: Pyrolysis gas, Pyrolysis oil, Biochar.

W2B Recycling Eco Station
150-900 ° C, works with pellets, produce pyrolysis gas, pyrolysis oil.
Models: 100kg/h, 500kg/h, 1000kg/h, 2000kg/h (Premiere)
Pyrolysis plants treat all types of industrial biomass which can't be recycled, including household wastes, sewage sludge, unrecycled plastic and rubber wastes, sludges and deteriorated soils.
By pyrolysis of organic matter, in the absence of oxygen, valuable products are obtained such as: recyclable pyrolysis gas, pyrolysis oil, biochar, carbon black.

Why is important, high quality combustion burners?
- It eliminates the phenomenon of forming dioxin.
- The high temperature of the combustion gases contributes to overall efficiency of the equipment-over 95%.
- Pyrolysis is auto sustainable process which recover pyrolysis gas in combustion thermic energy transfer process.
- ecoHORNET burners Technology: Whiteout wed gases and whiteout air polution. High efficiency based on low fuel consumption.

ecoHORNET use agripellets made from "everything waste biodegradable residues that burns".
2 kg of pellets = 1 m³ gas, 1 litre of diesel fuel, 4 kg of wood.

Circular Economy open a chance to recover biomass, landfills waste and to close plastic cycle.
Pyrolysis is a termo-chemical process, which decomposes and transforms the organic waste in charcoal, volatile compounds, and combustible gases.

Bio Economy - multiple benefits
- It eliminates the organic waste which causes environment problems.
- The operating costs are minimal, the installation is self-sustainable.
- The obtained products (bio gas, bio oil, biochar) are of the best quality.

Pyrolysis using pellets and agro-pellets
- ecoHORNET patented a multisystem burner, capable to use both wood and agro-pellets.
- The ecoHORNET burner develops temperatures of over 1200°C.
- The burning efficiency is almost 100%.

Eco STATION with ecoHORNET Pyrolysis produce the cheapest MW!
- 135 l of pyrolysis oil (7.4 kw/l)= 50 euro/MW
- 180 kg of wood pellets (5.6 kw/kg) = 27 euro/MW
- 220 kg of agro-pellets (4.6 kW/kg) = 9.9 euro/MW

Ecological functioning
- CO emissions < 250 mg/Nm³
- Particles emissions < 7 mg/Nm³
- VOC emissions < 10 mg/Nm³

Pyrolysis between 150 – 900°C with a single equipment
- Low temperature (150-450°C): Biochar 35%, Pyrolysis Oil 50%, Pyrolysis Gases 15%
- Medium temperature (450-650°C): Biochar 25%, Pyrolysis Oil 30%, Pyrolysis Gases 45%
- High temperature (650-900°C): Biochar 15%, Pyrolysis Oil 15%, Pyrolysis Gases 70%

Raw materials processed: Any kind of biomass, Municipal unselected contaminated organic waste, Sewage sludge, Plastic unreciclable waste, Rubber waste, Hydrocarbons-contaminated sludge, Soils contaminated with organic waste.

Pyrolysis Gas
Composed from CO, CO2, H2, CH4, C2H6 and C2H2.
Usage: Electric and thermal energy in cogeneration, Thermal energy (heating plants, burners), Chemical industry.

Pyrolysis Oil
Dark-brown colored liquid, chemical composition similar to that of biomass. Used as industrial fuel.
Can be refined into: light hydrocarbons (naphthenes, toluene etc), phenols, methyls, aldehyde etc, gasoline.

Vegetal Charcoal (Biochar)
Used as soil amendment. Stabilises the soil, enhances fertility, increases agricultural productivity.
Porous and hygroscopic, used to combat desertification.

The components of the ecoHORNET pyrolysis instalation: Sealing systems, Hot air transport system, Safety systems, Automation system, Drier, Dried material storage, Screw for reactor feeding, Reactor, Pellet burner, Condenser, Biochar tank, Biochar storage, Bio oil tank, Bio gas tank.

Excellence in quality, reliability, durability!
- 94-97% efficiency.
- High-performance automatic system.
- Made from long life materials.

The installation functioning principle
- Versatility of the installation for each type of organic material, in the range from 150°C to 900°C.
- The waste is chopped to about 10 mm or less and introduced in the drier. Humidity < 10%.
- The ecoHORNET pyrolysis reactor is vertical and it is equipped with several fire paths, which ensures a high efficiency.
`,
  GEN_Z_CONSUMER_HABITS: `
1º Informe - Hábitos de consumo de la Generación Z - OBSERVATORIO GEN Z

PRESENTACIÓN
Comprender a las nuevas generaciones ya no es una opción, sino una necesidad estratégica para marcas, empresas y la sociedad en su conjunto. La Generación Z, nacida en plena era digital, responde a patrones de comportamiento, valores y expectativas que desafían los modelos tradicionales y exigen un análisis específico, profundo y continuado. El Observatorio de la Generación Z nace para ser referente en el estudio del comportamiento de las personas jóvenes de España.

OBJETIVOS
Analizar en profundidad la influencia que ejercen las redes sociales en sus decisiones de compra.
1. El proceso de compra: Cómo deciden, qué les impulsa y qué valoran realmente.
2. Los canales de descubrimiento y compra: Del scroll en TikTok y redes sociales al carrito digital, pero también físico.
3. Las emociones vinculadas al consumo: Placer, evasión, validación o ansiedad.
4. Su relación con las marcas: ¿Hay fidelidad? ¿Qué significa realmente conectar de verdad?

MOTIVACIONES, MÁS ALLÁ DE LA NECESIDAD
¿Qué impulsa realmente a la Generación Z a comprar? La satisfacción personal.
Aproximadamente 6 de cada 10 jóvenes (61,8%) afirman que compran buscando una gratificación personal, un bienestar emocional o una forma de autoexpresión.
La motivación predominante es la satisfacción personal (61,8%). Las necesidades funcionales quedan en segundo plano (31,9%).
El consumo es emocional, aunque, como veremos, no por ello irracional.

FACTORES EN LA DECISIÓN: LA LÓGICA Z
La decisión final de compra se basa en criterios pragmáticos.
La relación calidad-precio se impone como el criterio más citado: 59,2%.
La experiencia de uso previa (fidelidad) es el segundo factor más relevante: 51,8%.
Las promociones y descuentos (27,8%) actúan como potentes disparadores de la compra. Emerge el concepto de “girl maths”: una lógica subjetiva que convierte el ahorro en una justificación para seguir comprando.
La Generación Z no compra por impulso, sino por convicción. Antes de decidir, investigan, comparan y validan.

LA BÚSQUEDA DE INFORMACIÓN PREVIA
La inmensa mayoría (un 81,2%) se sumerge en un proceso activo de búsqueda de información.
Las redes sociales son el punto de partida de la compra: Instagram (72,8%), TikTok (68%).
Otras fuentes fiables: recomendaciones de amigos y familiares (49,7%) y las reseñas online de otros usuarios (46,6%).
"Un perfil descuidado en redes me genera desconfianza".

EL PESO DE LOS VALORES: CONCIENCIA VS. ACCIÓN
Aunque existe una conciencia sobre problemas como la sostenibilidad, esta no se traduce, de forma generalizada, en un criterio decisivo de compra, especialmente cuando implica un sobrecoste.
Solo un 4,2% afirma comprar siempre productos sostenibles. 22% se declara consciente, pero no dispuesto a pagar más. 27,8% admite no tener nunca en cuenta la sostenibilidad.
Excepción notable: los productos “cruelty-free" (libres de crueldad animal) despiertan una mayor sensibilidad.

PLANIFICACIÓN VS. IMPULSO: UN EQUILIBRIO DELICADO
Pese a su imagen impulsiva, la Generación Z tiende a planificar y comparar. Menos de la mitad (36,1%) afirma contar con un presupuesto mensual fijo.
Disparadores del impulso: precio bajo, ofertas atractivas, aburrimiento, sensación de escasez y pérdida (FOMO).

REDES SOCIALES, UN ESCAPARATE INFINITO
Un 81,2% consulta estas plataformas antes de realizar una compra.
TikTok (68%) destaca por su capacidad para generar deseo y potenciar la compra más impulsiva.
Instagram (72,8%) inspira más confianza como fuente de información y prescripción.
YouTube es clave para compras con mayor compromiso económico.
La visibilidad en redes sociales es prácticamente una obligación para existir en el radar de la Generación Z.

OMNICANALIDAD FLUIDA: LO FÍSICO Y LO DIGITAL
La elección del canal depende del producto, la urgencia y la comodidad (44%).
33,5% prefieren punto de venta físico. 22,5% prefieren compra online.
Razones para online: ahorro de tiempo (46,1%), evitar desplazamientos (35,6%), disponibilidad 24/7 (35,1%).
Razones para físico: falta de confianza en online (34,4%), cercanía del punto de venta (32,8%), posibilidad de ver y tocar el producto.

PRODUCTOS FAVORITOS: REFLEJO DE IDENTIDAD
La moda y el textil (ropa, calzado, accesorios) lideran sus preferencias (60,2%).
Le sigue el ocio y entretenimiento (25,7%).
En tercer lugar, belleza y cosmética (5,2% general, 14,7% en la última compra).

EMOCIONES EN JUEGO: EL CONSUMO COMO EXPERIENCIA
La Generación Z asocia mayoritariamente la compra con emociones positivas: satisfacción, diversión y sorpresa agradable.

SATISFACCIÓN POST-COMPRA, ¿EXPECTATIVAS CUMPLIDAS?
Los niveles de satisfacción con la última compra realizada son notablemente altos.
Un 75,9% valoraron su satisfacción con un 6 o un 7 (sobre 7).

NOTORIEDAD E CONFIANZA: ¿IMPORTAN LAS MARCAS CONOCIDAS?
El reconocimiento de marca no es un factor absoluto. Un 45,6% afirma preferir comprar marcas conocidas.
La notoriedad de marca (29,8%) aparece por detrás de la calidad-precio (59,2%) y la experiencia de uso (51,8%).
La presencia digital de la marca es indiscutible. Un perfil descuidado genera profunda desconfianza.

PUBLICIDAD E INFLUENCERS: ENTRE LA CREDIBILIDAD Y EL RECHAZO
La Generación Z muestra un claro escepticismo hacia la publicidad tradicional.
La publicidad en redes sociales es percibida como molesta e invasiva.
Los influencers generan sentimientos encontrados. Son consultados por un 36,7% antes de comprar, pero existe desconfianza hacia las promociones pagadas.
El contenido de influencers es efectivo si cumple: Utilidad y detalle, Autenticidad percibida, Identificación, Calidad del contenido.
La Generación Z valora más el contenido orgánico y las recomendaciones de pares.

¿EXISTE LA FIDELIDAD Z HACIA LAS MARCAS?
La “experiencia de uso (fidelidad)" es el segundo factor más importante (51,8%).
Una vez que un producto les ha funcionado bien, son muy propensos a repetir la compra.
Esta "fidelidad pragmática" se basa en la confianza de que esa opción volverá a satisfacer sus necesidades de manera eficiente y fiable.

CONSTRUYENDO LA CONEXIÓN CON AUTENTICIDAD Y COHERENCIA
La respuesta parece residir en la autenticidad, la coherencia y la aportación de valor diferencial.
- Autenticidad: Comunicarse de forma transparente, honesta y alineada.
- Coherencia: Experiencia fluida y consistente en todos los puntos de contacto.
- Valor diferencial: Aportar valor añadido más allá del producto (contenido útil, entretenimiento, etc.).
- Escucha activa y comunidad.
- Transparencia en valores.

CONCLUSIONES PRINCIPALES
1. Consumo emocional, decisión lógica: Buscan satisfacción personal, pero evalúan con pragmatismo (calidad-precio y experiencia previa).
2. Nativos digitales e investigadores activos: Más del 80% consulta redes (Instagram y TikTok) antes de comprar. No son consumidores pasivos.
3. Omnicanalidad fluida como norma: No distinguen rígidamente entre online y offline.
4. Identidad y autoexpresión a través del consumo: Moda y ocio son herramientas para construir y proyectar identidad.
5. Sensibilidad al precio y a las ofertas: El precio es un factor crítico y son muy receptivos a promociones.
6. Escepticismo ante la publicidad: Rechazan los formatos intrusivos y prefieren contenido orgánico y auténtico.
7. Valores importantes, pero condicionados: La sostenibilidad no es un driver principal si implica pagar más.
8. Fidelidad basada en la experiencia: Muestran fuerte fidelidad hacia las marcas que les ofrecen consistentemente una buena experiencia.
9. Compra como experiencia positiva: Asocian el acto de comprar con emociones positivas.
10. Planificadores con ventanas al impulso: Tienden a investigar, pero no son inmunes a la compra impulsiva.
`,
  DIESEL_CONVERSION_PROCESS: `Contenido para DIESEL_CONVERSION_PROCESS...`,
  BIOMASS_PYROLYSIS_MODELING: `Contenido para BIOMASS_PYROLYSIS_MODELING...`,
  ZEOLITES_IN_PLASTICS_PYROLYSIS: `
### Rol de las Zeolitas en la Pirólisis Catalítica de Plásticos

**Resumen General:**
Las zeolitas son catalizadores de aluminosilicato microporosos cristalinos, fundamentales en la industria petroquímica y cada vez más relevantes en la valorización de residuos plásticos. Su estructura única, con una red de poros de tamaño molecular, junto con su alta acidez superficial, las convierte en excelentes "tamices moleculares" y catalizadores de craqueo. En el contexto de la pirólisis de plásticos, su función principal es tomar los vapores de hidrocarburos de cadena larga, generados en la descomposición térmica inicial, y romperlos (craquearlos) en moléculas más pequeñas y de mayor valor comercial.

**Mecanismo de Acción:**
1.  **Craqueo Catalítico:** Los sitios ácidos de la zeolita (principalmente sitios de Brønsted) protonan las moléculas de hidrocarburos, iniciando una serie de reacciones de craqueo, isomerización y oligomerización.
2.  **Selectividad de Forma:** La estructura de poros de la zeolita (ej. canales de 5-6 Å en la HZSM-5) controla qué moléculas pueden entrar, reaccionar y salir. Esto permite dirigir la producción hacia un rango específico de productos, como los hidrocarburos aromáticos (Benceno, Tolueno, Xileno - BTX), que son componentes clave de la gasolina.
3.  **Desoxigenación:** En la pirólisis de biomasa o plásticos con contenido de oxígeno (como el PET), las zeolitas promueven reacciones de deshidratación, descarboxilación y descarbonilación, eliminando el oxígeno y mejorando la calidad del bio-aceite.

**Efecto en la Distribución de Productos:**
El uso de zeolitas, especialmente la HZSM-5, modifica drásticamente el rendimiento de los productos de la pirólisis de poliolefinas (PE, PP):
*   **Disminuye drásticamente** el rendimiento de la fracción líquida pesada (ceras y aceites >C21).
*   **Aumenta significativamente** el rendimiento de la fracción líquida de rango de gasolina (C5-C12), rica en aromáticos.
*   **Aumenta** la producción de gases ligeros, principalmente olefinas como propileno y butenos (LPG).
*   **Produce coque**, un subproducto carbonoso que se deposita en la superficie del catalizador, causando su desactivación progresiva.

**Variables Clave del Proceso:**
*   **Relación Silicio/Aluminio (Si/Al):** Una baja relación Si/Al implica una mayor concentración de sitios ácidos, lo que favorece el craqueo pero también la formación de coque. Una alta relación Si/Al es menos activa pero más resistente a la desactivación.
*   **Temperatura:** La actividad catalítica es óptima típicamente entre 400°C y 600°C. Temperaturas más altas favorecen la producción de gases y aromáticos ligeros.
*   **Relación Catalizador/Plástico:** Aumentar la cantidad de catalizador mejora la conversión, pero también incrementa la producción de gas y coque a expensas del líquido.

**Conclusión Estratégica:**
Las zeolitas son una herramienta poderosa para transformar los productos de la pirólisis de plásticos de un aceite ceroso de bajo valor a fracciones de hidrocarburos directamente integrables en la infraestructura de una refinería. Sin embargo, su uso requiere un balance cuidadoso entre la actividad catalítica (para maximizar la conversión a productos deseados) y la gestión de la desactivación por coque, que es el principal desafío operativo.
`,
  NATURAL_ZEOLITES_IN_CEMENT_COSTAFERA_2011: JSON.stringify({
    "id": "costafreda_2011_zeolite_cement",
    "studyTitle": "Caracterización y Aplicación de Zeolitas Naturales en Cemento (Costafreda, 2011)",
    "summary": "Este estudio evalúa las propiedades de tres muestras de zeolitas (México, Cuba, España) para su uso como adición puzolánica en cementos. Se analizan densidades, absorción de agua, composición química y su efecto en el fraguado y resistencia del cemento.",
    "keywords": ["zeolita natural", "cemento", "puzolana", "propiedades físicas", "resistencia mecánica"],
    "samples": [
      {
        "name": "ZEO-MÉXICO (San Luis Potosí)",
        "physicalProperties": { "fraction_mm": "4-10", "density_real_Mg_m3": 2.20, "density_apparent_Mg_m3": 1.27, "water_absorption_percent": 33.22 },
        "chemicalAnalysis": { "sio2_total_percent": 67.57, "cao_total_percent": 3.08, "fe2o3_percent": 2.45, "al2o3_percent": 12.84, "sio2_reactive_percent": 56.94, "cao_reactive_percent": 2.83, "insoluble_residue_percent": 3.01 },
        "xrfAnalysis_percent": { "sio2": 67.3, "al2o3": 12.14, "fe2o3": 6.77, "cao": 6.87, "mgo": 1.25, "k2o": 1.27, "na2o": 0.87, "ppc": 11.51 },
        "cementTests": {
          "settingTime": { "water_consistency_percent": 39.0, "initial_set_min": 315, "final_set_min": 380, "volume_stability_mm": 0.0 },
          "mechanicalStrength_MPa": [
            { "age_days": 7, "flexion": 5.4, "compression": 27.9 },
            { "age_days": 28, "flexion": 8.0, "compression": 50.4 },
            { "age_days": 90, "flexion": 8.3, "compression": 59.1 }
          ]
        }
      },
      {
        "name": "ZEO-CUBA (San Andrés)",
        "physicalProperties": { "fraction_mm": "4-10", "density_real_Mg_m3": 2.31, "density_apparent_Mg_m3": 1.79, "water_absorption_percent": 12.61 },
        "chemicalAnalysis": { "sio2_total_percent": 65.04, "cao_total_percent": 2.92, "fe2o3_percent": 2.25, "al2o3_percent": 11.19, "sio2_reactive_percent": 63.31, "cao_reactive_percent": 2.80, "insoluble_residue_percent": 3.21 },
        "xrfAnalysis_percent": { "sio2": 65.41, "al2o3": 13.15, "fe2o3": 1.9, "cao": 4.32, "mgo": 0.36, "k2o": 2.23, "na2o": 0.48, "ppc": 11.68 },
        "cementTests": {
          "settingTime": { "water_consistency_percent": 33.5, "initial_set_min": 315, "final_set_min": 385, "volume_stability_mm": 1.0 },
          "mechanicalStrength_MPa": [
            { "age_days": 7, "flexion": 5.4, "compression": 28.5 },
            { "age_days": 28, "flexion": 8.1, "compression": 50.9 },
            { "age_days": 90, "flexion": 8.4, "compression": 62.3 }
          ]
        }
      },
      {
        "name": "ZEO-ESPAÑA (Cabo de Gata)",
        "physicalProperties": { "fraction_mm": "4-10", "density_real_Mg_m3": 2.31, "density_apparent_Mg_m3": 1.57, "water_absorption_percent": 20.36 },
        "chemicalAnalysis": { "sio2_total_percent": 67.89, "cao_total_percent": 1.57, "fe2o3_percent": 1.39, "al2o3_percent": 11.60, "sio2_reactive_percent": 60.18, "cao_reactive_percent": 1.30, "insoluble_residue_percent": 2.31 },
        "xrfAnalysis_percent": { "sio2": 67.79, "al2o3": 12.11, "fe2o3": 1.46, "cao": 1.68, "mgo": 1.31, "k2o": 2.6, "na2o": 3.47, "ppc": 11.20 },
        "cementTests": {
          "settingTime": { "water_consistency_percent": 39.0, "initial_set_min": 325, "final_set_min": 395, "volume_stability_mm": 2.0 },
          "mechanicalStrength_MPa": [
            { "age_days": 7, "flexion": 5.6, "compression": 30.3 },
            { "age_days": 28, "flexion": 7.1, "compression": 43.7 },
            { "age_days": 90, "flexion": 7.6, "compression": 55.5 }
          ]
        }
      }
    ]
  }, null, 2),
  BIFUNCTIONAL_CATALYSTS_EVALUATION: `Contenido para BIFUNCTIONAL_CATALYSTS_EVALUATION...`,
  BIO_OIL_OPTIMIZATION_PEANUT_SHELL_V2_CICAT: `Contenido para BIO_OIL_OPTIMIZATION_PEANUT_SHELL_V2_CICAT...`,
  OXYGENATED_FEEDSTOCK_PYROLYSIS_PATENT: `Contenido para OXYGENATED_FEEDSTOCK_PYROLYSIS_PATENT...`,
};
