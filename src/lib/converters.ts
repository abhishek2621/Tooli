export type UnitCategory = "length" | "mass" | "volume" | "temperature" | "digital";

export interface UnitDefinition {
    id: string;
    label: string;
    ratio: number; // Ratio relative to a base unit (e.g., Meter for length)
    offset?: number; // For temperature (e.g., +32 for F)
}

export const unitCategories: Record<UnitCategory, string> = {
    length: "Length",
    mass: "Mass",
    volume: "Volume",
    temperature: "Temperature",
    digital: "Digital Storage",
};

export const units: Record<UnitCategory, UnitDefinition[]> = {
    length: [
        { id: "m", label: "Meter (m)", ratio: 1 },
        { id: "km", label: "Kilometer (km)", ratio: 1000 },
        { id: "cm", label: "Centimeter (cm)", ratio: 0.01 },
        { id: "mm", label: "Millimeter (mm)", ratio: 0.001 },
        { id: "mi", label: "Mile (mi)", ratio: 1609.344 },
        { id: "yd", label: "Yard (yd)", ratio: 0.9144 },
        { id: "ft", label: "Foot (ft)", ratio: 0.3048 },
        { id: "in", label: "Inch (in)", ratio: 0.0254 },
    ],
    mass: [
        { id: "kg", label: "Kilogram (kg)", ratio: 1 },
        { id: "g", label: "Gram (g)", ratio: 0.001 },
        { id: "mg", label: "Milligram (mg)", ratio: 0.000001 },
        { id: "ton", label: "Metric Ton (t)", ratio: 1000 },
        { id: "lb", label: "Pound (lb)", ratio: 0.45359237 },
        { id: "oz", label: "Ounce (oz)", ratio: 0.02834952 },
    ],
    volume: [
        { id: "l", label: "Liter (l)", ratio: 1 },
        { id: "ml", label: "Milliliter (ml)", ratio: 0.001 },
        { id: "gal", label: "US Gallon (gal)", ratio: 3.78541 },
        { id: "qt", label: "US Quart (qt)", ratio: 0.946353 },
        { id: "pt", label: "US Pint (pt)", ratio: 0.473176 },
        { id: "cup", label: "US Cup", ratio: 0.236588 },
        { id: "fl_oz", label: "US Fluid Ounce (fl oz)", ratio: 0.0295735 },
    ],
    temperature: [
        { id: "c", label: "Celsius (°C)", ratio: 1, offset: 0 },
        { id: "f", label: "Fahrenheit (°F)", ratio: 1.8, offset: 32 }, // Special handling needed
        { id: "k", label: "Kelvin (K)", ratio: 1, offset: 273.15 }, // Special handling needed
    ],
    digital: [
        { id: "b", label: "Byte (B)", ratio: 1 },
        { id: "kb", label: "Kilobyte (KB)", ratio: 1024 },
        { id: "mb", label: "Megabyte (MB)", ratio: 1048576 },
        { id: "gb", label: "Gigabyte (GB)", ratio: 1073741824 },
        { id: "tb", label: "Terabyte (TB)", ratio: 1099511627776 },
        { id: "pb", label: "Petabyte (PB)", ratio: 1125899906842624 },
    ],
};

export function convertUnit(value: number, fromId: string, toId: string, category: UnitCategory): number {
    const categoryUnits = units[category];
    const fromUnit = categoryUnits.find(u => u.id === fromId);
    const toUnit = categoryUnits.find(u => u.id === toId);

    if (!fromUnit || !toUnit) return 0;

    // Logic for linear conversions (Length, Mass, Volume, Digital)
    if (category !== "temperature") {
        // Convert to base unit then to target unit
        const baseValue = value * fromUnit.ratio;
        return baseValue / toUnit.ratio;
    }

    // Logic for Temperature (Non-linear due to offsets)
    // We convert everything to Celsius first as base
    let celsiusValue = 0;

    if (fromId === "c") celsiusValue = value;
    else if (fromId === "f") celsiusValue = (value - 32) * (5 / 9);
    else if (fromId === "k") celsiusValue = value - 273.15;

    // Convert Celsius to Target
    if (toId === "c") return celsiusValue;
    if (toId === "f") return (celsiusValue * 9 / 5) + 32;
    if (toId === "k") return celsiusValue + 273.15;

    return 0;
}
