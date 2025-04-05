interface FabricSelectorProps {
  fabric: string;
  onChange: (fabric: string) => void;
}

export const FabricSelector = ({ fabric, onChange }: FabricSelectorProps) => {
  const fabrics = [
    {
      id: 'cotton',
      name: 'Cotton',
      description: 'Soft and breathable',
    },
    {
      id: 'silk',
      name: 'Silk',
      description: 'Smooth and luxurious',
    },
    {
      id: 'wool',
      name: 'Wool',
      description: 'Warm and cozy',
    },
    {
      id: 'linen',
      name: 'Linen',
      description: 'Light and airy',
    },
    {
      id: 'denim',
      name: 'Denim',
      description: 'Sturdy and casual',
    },
  ];

  return (
    <div className="space-y-2">
      {fabrics.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`w-full p-2 text-left rounded ${
            f.id === fabric
              ? 'bg-indigo-100 border-2 border-indigo-600'
              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
          }`}
        >
          <div className="font-medium">{f.name}</div>
          <div className="text-sm text-gray-600">{f.description}</div>
        </button>
      ))}
    </div>
  );
}; 