import React, { useEffect } from 'react';

export default function HeroIconEditor({ config, setConfig, onReset, selectedId, setSelectedId, editorMode, setEditorMode }) {
  const [stepValue, setStepValue] = React.useState(0.5);
  const [copyStatus, setCopyStatus] = React.useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1-4 selection
      if (e.key === '1') setSelectedId('chatgpt');
      if (e.key === '2') setSelectedId('canva');
      if (e.key === '3') setSelectedId('photoshop');
      if (e.key === '4') setSelectedId('illustrator');

      // Arrows for movement
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        
        let currentStep = stepValue;
        if (e.shiftKey) {
          if (stepValue === 0.1) currentStep = 0.5;
          else if (stepValue === 0.5) currentStep = 2;
        }
        
        setConfig(prev => {
          const next = JSON.parse(JSON.stringify(prev));
          const icon = next.icons.find(i => i.id === selectedId);
          if (e.key === 'ArrowUp') icon.y -= currentStep;
          if (e.key === 'ArrowDown') icon.y += currentStep;
          if (e.key === 'ArrowLeft') icon.x -= currentStep;
          if (e.key === 'ArrowRight') icon.x += currentStep;
          return next;
        });
      }

      // Rotation
      if (['[', ']'].includes(e.key)) {
        e.preventDefault();
        const rotStep = e.shiftKey ? 15 : 5;
        setConfig(prev => {
          const next = JSON.parse(JSON.stringify(prev));
          const icon = next.icons.find(i => i.id === selectedId);
          if (icon.rotation === undefined) icon.rotation = 0;
          if (e.key === '[') icon.rotation -= rotStep;
          if (e.key === ']') icon.rotation += rotStep;
          if (icon.rotation < 0) icon.rotation += 360;
          if (icon.rotation >= 360) icon.rotation -= 360;
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, stepValue, setConfig, setSelectedId]);

  const move = (axis, direction, useShift = false) => {
    let currentStep = stepValue;
    if (useShift) {
      if (stepValue === 0.1) currentStep = 0.5;
      else if (stepValue === 0.5) currentStep = 2;
    }
    setConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const icon = next.icons.find(i => i.id === selectedId);
      if (axis === 'x') icon.x += (direction * currentStep);
      if (axis === 'y') icon.y += (direction * currentStep);
      return next;
    });
  };

  const scale = (direction) => {
    setConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const newScale = Math.min(2, Math.max(0.5, next.scale + (direction * 0.05)));
      next.scale = newScale;
      return next;
    });
  };

  const rotateIcon = (direction, useShift = false) => {
    const rotStep = useShift ? 15 : 5;
    setConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const icon = next.icons.find(i => i.id === selectedId);
      if (icon.rotation === undefined) icon.rotation = 0;
      icon.rotation += (direction * rotStep);
      if (icon.rotation < 0) icon.rotation += 360;
      if (icon.rotation >= 360) icon.rotation -= 360;
      return next;
    });
  };

  const resetRotation = () => {
    setConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const icon = next.icons.find(i => i.id === selectedId);
      icon.rotation = 0;
      return next;
    });
  };

  const handleCopy = async () => {
    const formatted = JSON.stringify(config, null, 2);
    try {
      await navigator.clipboard.writeText(formatted);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(null), 2000);
    } catch (err) {
      setCopyStatus('Failed');
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  const handleDownload = () => {
    const formatted = JSON.stringify(config, null, 2);
    const blob = new Blob([formatted], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heroIcons.${editorMode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedIcon = config.icons.find(i => i.id === selectedId);

  return (
    <div style={{
      position: 'fixed', bottom: '16px', right: '16px', zIndex: 9999,
      width: '260px', background: '#f8f9fa', border: '1px solid #dee2e6',
      borderRadius: '8px', padding: '12px', fontFamily: 'Inter, sans-serif',
      fontSize: '12px', color: '#212529', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      pointerEvents: 'auto'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Icon Editor</span>
        <span style={{ 
          fontSize: '10px', 
          padding: '2px 6px', 
          background: editorMode === 'desktop' ? '#0d6efd' : '#198754', 
          color: 'white', 
          borderRadius: '10px' 
        }}>
          {editorMode.toUpperCase()}
        </span>
      </div>
      
      {/* Mode Toggle */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: '#e9ecef', padding: '4px', borderRadius: '6px' }}>
        <button 
          onClick={() => setEditorMode('desktop')}
          style={{
            flex: 1, padding: '6px', border: 'none', borderRadius: '4px',
            background: editorMode === 'desktop' ? '#fff' : 'transparent',
            fontWeight: editorMode === 'desktop' ? 'bold' : 'normal',
            boxShadow: editorMode === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            cursor: 'pointer'
          }}
        >Desktop</button>
        <button 
          onClick={() => setEditorMode('mobile')}
          style={{
            flex: 1, padding: '6px', border: 'none', borderRadius: '4px',
            background: editorMode === 'mobile' ? '#fff' : 'transparent',
            fontWeight: editorMode === 'mobile' ? 'bold' : 'normal',
            boxShadow: editorMode === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            cursor: 'pointer'
          }}
        >Mobile</button>
      </div>

      {/* Selection */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
        {config.icons.map(icon => (
          <button 
            key={icon.id}
            onClick={() => setSelectedId(icon.id)}
            style={{
              padding: '4px 6px',
              border: `1px solid ${selectedId === icon.id ? '#0d6efd' : '#ced4da'}`,
              background: selectedId === icon.id ? '#e7f1ff' : '#fff',
              color: selectedId === icon.id ? '#0d6efd' : '#495057',
              borderRadius: '4px', cursor: 'pointer',
              flex: 1, textTransform: 'capitalize'
            }}
          >
            {icon.id.substring(0,3)}
          </button>
        ))}
      </div>

      {/* Readout */}
      <div style={{ marginBottom: '12px', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
        <span>ID: {selectedIcon.id}</span>
        <span>X: {selectedIcon.x.toFixed(1)}%</span>
        <span>Y: {selectedIcon.y.toFixed(1)}%</span>
        <span>R: {selectedIcon.rotation || 0}°</span>
      </div>

      {/* D-PAD */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px' }}>
        <button aria-label="Up" onClick={(e) => move('y', -1, e.shiftKey)} style={btnStyle}>↑</button>
        <div style={{ display: 'flex', gap: '4px', margin: '4px 0' }}>
          <button aria-label="Left" onClick={(e) => move('x', -1, e.shiftKey)} style={btnStyle}>←</button>
          <div style={{ width: '28px' }}></div>
          <button aria-label="Right" onClick={(e) => move('x', 1, e.shiftKey)} style={btnStyle}>→</button>
        </div>
        <button aria-label="Down" onClick={(e) => move('y', 1, e.shiftKey)} style={btnStyle}>↓</button>
      </div>

      {/* Step Size */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span>Step:</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[0.1, 0.5, 2].map(val => (
            <button 
              key={val}
              onClick={() => setStepValue(val)}
              style={{
                ...btnStyle,
                background: stepValue === val ? '#e9ecef' : '#fff',
                borderColor: stepValue === val ? '#adb5bd' : '#dee2e6'
              }}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* Scale */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span>Scale: {config.scale.toFixed(2)}</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button aria-label="Decrease size" onClick={() => scale(-1)} style={btnStyle}>-</button>
          <button aria-label="Increase size" onClick={() => scale(1)} style={btnStyle}>+</button>
        </div>
      </div>

      {/* Rotation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span>Rotation:</span>
          <button aria-label="Reset rotation" onClick={resetRotation} style={{ ...btnStyle, width: '20px', height: '20px', fontSize: '10px' }}>↺</button>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button aria-label="Rotate left" onClick={(e) => rotateIcon(-1, e.shiftKey)} style={btnStyle}>↶</button>
          <button aria-label="Rotate right" onClick={(e) => rotateIcon(1, e.shiftKey)} style={btnStyle}>↷</button>
        </div>
      </div>

      {/* Export */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <button onClick={handleCopy} style={actionBtnStyle}>
          {copyStatus || 'Copy JSON'}
        </button>
        <button onClick={handleDownload} style={actionBtnStyle}>Download JSON</button>
        <button onClick={onReset} style={{ ...actionBtnStyle, background: '#f8d7da', color: '#842029', borderColor: '#f5c2c7' }}>
          Reset
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  width: '28px', height: '28px', border: '1px solid #dee2e6', background: '#fff',
  borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0
};

const actionBtnStyle = {
  width: '100%', padding: '6px', border: '1px solid #dee2e6', background: '#fff',
  borderRadius: '4px', cursor: 'pointer', fontWeight: '500'
};
