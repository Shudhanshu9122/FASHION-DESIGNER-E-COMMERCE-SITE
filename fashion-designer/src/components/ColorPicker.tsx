interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const colors = [
    '#ffffff', // White
    '#000000', // Black
    '#ff0000', // Red
    '#00ff00', // Green
    '#0000ff', // Blue
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
    '#808080', // Gray
    '#800000', // Maroon
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {colors.map((c) => (
        <button
          key={c}
          className={`w-8 h-8 rounded-full border-2 ${
            c === color ? 'border-indigo-600' : 'border-gray-200'
          }`}
          style={{ backgroundColor: c }}
          onClick={() => onChange(c)}
          aria-label={`Select color ${c}`}
        />
      ))}
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8"
        title="Choose custom color"
      />
    </div>
  );
}; 