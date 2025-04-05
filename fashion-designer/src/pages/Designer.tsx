import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Component {
  id: string;
  type: 'neckline' | 'sleeve' | 'bodice' | 'skirt' | 'accessory';
  name: string;
  image: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  color: string;
  pattern: string;
  texture: string;
  opacity: number;
  layer: number;
}

const Designer = () => {
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [activeTab, setActiveTab] = useState('components');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentPattern, setCurrentPattern] = useState('none');
  const [currentTexture, setCurrentTexture] = useState('none');
  const [currentOpacity, setCurrentOpacity] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(100);
  const canvasRef = useRef<HTMLDivElement>(null);

  const availableComponents = {
    neckline: [
      { id: 'v-neck', name: 'V-Neck', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVja2xpbmV8ZW58MHx8MHx8fDA%3D' },
      { id: 'round-neck', name: 'Round Neck', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVja2xpbmV8ZW58MHx8MHx8fDA%3D' },
      { id: 'square-neck', name: 'Square Neck', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVja2xpbmV8ZW58MHx8MHx8fDA%3D' },
    ],
    sleeve: [
      { id: 'short-sleeve', name: 'Short Sleeve', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xlZXZlfGVufDB8fDB8fHww%3D' },
      { id: 'long-sleeve', name: 'Long Sleeve', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xlZXZlfGVufDB8fDB8fHww%3D' },
      { id: 'sleeveless', name: 'Sleeveless', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xlZXZlfGVufDB8fDB8fHww%3D' },
    ],
    bodice: [
      { id: 'fitted', name: 'Fitted', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9kaWNlfGVufDB8fDB8fHww%3D' },
      { id: 'loose', name: 'Loose', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9kaWNlfGVufDB8fDB8fHww%3D' },
      { id: 'corset', name: 'Corset', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9kaWNlfGVufDB8fDB8fHww%3D' },
    ],
    skirt: [
      { id: 'a-line', name: 'A-Line', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpcnR8ZW58MHx8MHx8fDA%3D' },
      { id: 'mermaid', name: 'Mermaid', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpcnR8ZW58MHx8MHx8fDA%3D' },
      { id: 'ball-gown', name: 'Ball Gown', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpcnR8ZW58MHx8MHx8fDA%3D' },
    ],
    accessory: [
      { id: 'belt', name: 'Belt', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3J5fGVufDB8fDB8fHww%3D' },
      { id: 'bow', name: 'Bow', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3J5fGVufDB8fDB8fHww%3D' },
      { id: 'flowers', name: 'Flowers', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3J5fGVufDB8fDB8fHww%3D' },
    ],
  };

  const patterns = [
    { id: 'none', name: 'None', image: '' },
    { id: 'stripes', name: 'Stripes', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyaXBlc3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'polka', name: 'Polka Dots', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9sa2F8ZW58MHx8MHx8fDA%3D' },
    { id: 'floral', name: 'Floral', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmxvcmFsfGVufDB8fDB8fHww%3D' },
  ];

  const textures = [
    { id: 'none', name: 'None', image: '' },
    { id: 'cotton', name: 'Cotton', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dG9ufGVufDB8fDB8fHww%3D' },
    { id: 'silk', name: 'Silk', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lsa3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'lace', name: 'Lace', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFjZXxlbnwwfHwwfHx8MA%3D%3D' },
  ];

  const handleDragStart = (e: React.DragEvent, component: any) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const component = JSON.parse(e.dataTransfer.getData('component'));
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newComponent: Component = {
        ...component,
        id: `${component.id}-${Date.now()}`,
        position: { x, y },
        scale: 1,
        rotation: 0,
        color: currentColor,
        pattern: currentPattern,
        texture: currentTexture,
        opacity: currentOpacity,
        layer: components.length,
      };
      setComponents([...components, newComponent]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleComponentClick = (component: Component) => {
    setSelectedComponent(component);
    setCurrentColor(component.color);
    setCurrentPattern(component.pattern);
    setCurrentTexture(component.texture);
    setCurrentOpacity(component.opacity);
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    if (selectedComponent) {
      setComponents(
        components.map((c) =>
          c.id === selectedComponent.id ? { ...c, color } : c
        )
      );
    }
  };

  const handlePatternChange = (pattern: string) => {
    setCurrentPattern(pattern);
    if (selectedComponent) {
      setComponents(
        components.map((c) =>
          c.id === selectedComponent.id ? { ...c, pattern } : c
        )
      );
    }
  };

  const handleTextureChange = (texture: string) => {
    setCurrentTexture(texture);
    if (selectedComponent) {
      setComponents(
        components.map((c) =>
          c.id === selectedComponent.id ? { ...c, texture } : c
        )
      );
    }
  };

  const handleOpacityChange = (opacity: number) => {
    setCurrentOpacity(opacity);
    if (selectedComponent) {
      setComponents(
        components.map((c) =>
          c.id === selectedComponent.id ? { ...c, opacity } : c
        )
      );
    }
  };

  const handleTransform = (componentId: string, transform: { scale?: number; rotation?: number }) => {
    setComponents(
      components.map((c) =>
        c.id === componentId
          ? { ...c, ...transform }
          : c
      )
    );
  };

  const handleLayerChange = (componentId: string, direction: 'up' | 'down') => {
    const index = components.findIndex(c => c.id === componentId);
    if (index === -1) return;

    const newComponents = [...components];
    const newIndex = direction === 'up' ? index + 1 : index - 1;
    
    if (newIndex >= 0 && newIndex < components.length) {
      [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];
      setComponents(newComponents);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Components */}
      <div className="w-64 bg-white shadow-lg p-4">
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('components')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'components' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            Components
          </button>
          <button
            onClick={() => setActiveTab('layers')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'layers' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            Layers
          </button>
        </div>

        {activeTab === 'components' && (
          <div className="space-y-4">
            {Object.entries(availableComponents).map(([type, items]) => (
              <div key={type} className="mb-4">
                <h3 className="font-semibold mb-2 capitalize">{type}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, { ...item, type })}
                      className="p-2 border rounded-lg cursor-move hover:bg-gray-50"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-20 object-cover rounded"
                      />
                      <p className="text-sm text-center mt-1">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="space-y-2">
            {components.map((component, index) => (
              <div
                key={component.id}
                className={`p-2 border rounded-lg cursor-pointer ${
                  selectedComponent?.id === component.id ? 'bg-indigo-100' : ''
                }`}
                onClick={() => handleComponentClick(component)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm">{component.name}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLayerChange(component.id, 'up');
                      }}
                      disabled={index === components.length - 1}
                      className="text-xs p-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLayerChange(component.id, 'down');
                      }}
                      disabled={index === 0}
                      className="text-xs p-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
          {showGrid && (
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-gray-100" />
              ))}
            </div>
          )}
          {components.map((component) => (
            <motion.div
              key={component.id}
              className="absolute cursor-move"
              style={{
                left: component.position.x,
                top: component.position.y,
                transform: `scale(${component.scale}) rotate(${component.rotation}deg)`,
                filter: `hue-rotate(${component.color}) opacity(${component.opacity}%)`,
                zIndex: component.layer,
              }}
              drag
              dragMomentum={false}
              onDragEnd={(e, info) => {
                setComponents(
                  components.map((c) =>
                    c.id === component.id
                      ? {
                          ...c,
                          position: {
                            x: c.position.x + info.offset.x,
                            y: c.position.y + info.offset.y,
                          },
                        }
                      : c
                  )
                );
              }}
              onClick={() => handleComponentClick(component)}
            >
              <div className="relative">
                <img
                  src={component.image}
                  alt={component.name}
                  className="w-32 h-32 object-contain"
                />
                {component.pattern !== 'none' && (
                  <div
                    className="absolute inset-0 mix-blend-overlay"
                    style={{
                      backgroundImage: `url(${patterns.find(p => p.id === component.pattern)?.image})`,
                      backgroundSize: 'cover',
                    }}
                  />
                )}
                {component.texture !== 'none' && (
                  <div
                    className="absolute inset-0 mix-blend-overlay"
                    style={{
                      backgroundImage: `url(${textures.find(t => t.id === component.texture)?.image})`,
                      backgroundSize: 'cover',
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel - Properties */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h3 className="font-semibold mb-4">Properties</h3>
        {selectedComponent && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pattern</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => handlePatternChange(pattern.id)}
                    className={`p-2 border rounded-lg ${
                      currentPattern === pattern.id ? 'border-indigo-500' : ''
                    }`}
                  >
                    {pattern.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Texture</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {textures.map((texture) => (
                  <button
                    key={texture.id}
                    onClick={() => handleTextureChange(texture.id)}
                    className={`p-2 border rounded-lg ${
                      currentTexture === texture.id ? 'border-indigo-500' : ''
                    }`}
                  >
                    {texture.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                value={currentOpacity}
                onChange={(e) => handleOpacityChange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Scale</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={selectedComponent.scale}
                onChange={(e) =>
                  handleTransform(selectedComponent.id, { scale: parseFloat(e.target.value) })
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rotation</label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={selectedComponent.rotation}
                onChange={(e) =>
                  handleTransform(selectedComponent.id, { rotation: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setComponents(components.filter((c) => c.id !== selectedComponent.id));
                  setSelectedComponent(null);
                }}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                {showGrid ? 'Hide Grid' : 'Show Grid'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Designer; 