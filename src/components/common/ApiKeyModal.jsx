import React, { useState, useEffect } from 'react';
import { getGeminiApiKey, setGeminiApiKey, hasGeminiApiKey } from '../../services/geminiOralCancerService';

export default function ApiKeyModal({ isOpen, onClose, onKeySaved }) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }

  useEffect(() => {
    if (isOpen) {
      setApiKey(getGeminiApiKey());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      setTestResult({ success: false, message: 'Please enter a valid Gemini API key.' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      // Test the key with a quick test prompt to Gemini 2.5 Flash
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${trimmed}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Ping test. Reply with: OK' }] }],
          generationConfig: { maxOutputTokens: 10 },
        }),
      });

      if (!res.ok) {
        // Fallback test on gemini-1.5-flash
        const endpoint15 = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${trimmed}`;
        const res15 = await fetch(endpoint15, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Ping test. Reply with: OK' }] }],
            generationConfig: { maxOutputTokens: 10 },
          }),
        });

        if (!res15.ok) {
          const errText = await res.text();
          throw new Error(`API verification failed (${res.status}): Please check that your key is correct and has Gemini API access.`);
        }
      }

      setGeminiApiKey(trimmed);
      setTestResult({ success: true, message: 'Gemini AI successfully connected! Real multimodal diagnostic engine is active.' });
      if (onKeySaved) onKeySaved(trimmed);
      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (err) {
      setTestResult({ success: false, message: err.message || 'Verification failed. Please check your key.' });
    } finally {
      setTesting(false);
    }
  };

  const handleRemoveKey = () => {
    setGeminiApiKey('');
    setApiKey('');
    setTestResult({ success: true, message: 'API key removed. Using clinical knowledge fallback engine.' });
    if (onKeySaved) onKeySaved('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          border: '1.5px solid #e2e8f0',
          padding: '24px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                boxShadow: '0 6px 14px rgba(13, 148, 136, 0.3)',
              }}
            >
              ✨
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Connect Gemini AI Engine
              </h3>
              <p style={{ margin: '3px 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                Real-time Multimodal Oral Cancer &amp; OPMD Diagnostic Detection
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            ✕
          </button>
        </div>

        {/* Info Box */}
        <div
          style={{
            backgroundColor: '#f0fdfa',
            border: '1px solid #ccfbf1',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '18px',
            fontSize: '0.8rem',
            color: '#0f766e',
            lineHeight: 1.45,
          }}
        >
          <strong>Clinical Diagnostic Engine:</strong>
          <div>
            Powered by Google Gemini multimodal AI, trained to evaluate oral mucosal photographs against WHO,
            American Cancer Society, Cleveland Clinic, and National Oral Cancer Registry (NOCR) criteria.
          </div>
        </div>

        {/* Input Field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
            Google Gemini API Key
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API Key (e.g. AIzaSy...)"
              style={{
                width: '100%',
                padding: '10px 42px 10px 14px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.88rem',
                outline: 'none',
                color: '#0f172a',
                fontFamily: showKey ? 'monospace' : 'inherit',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0d9488')}
              onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
            />
            <button
              type="button"
              onClick={() => setShowKey((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '4px',
              }}
              title={showKey ? 'Hide key' : 'Show key'}
            >
              {showKey ? '👁️' : '🔒'}
            </button>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              Your key is saved locally in your browser.
            </span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#0d9488',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Get free Gemini Key ↗
            </a>
          </div>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: testResult.success ? '#dcfce7' : '#fee2e2',
              color: testResult.success ? '#15803d' : '#b91c1c',
              border: `1px solid ${testResult.success ? '#86efac' : '#fca5a5'}`,
            }}
          >
            {testResult.success ? '✓ ' : '⚠ '}
            {testResult.message}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
          {hasGeminiApiKey() ? (
            <button
              type="button"
              onClick={handleRemoveKey}
              style={{
                background: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Remove Key
            </button>
          ) : (
            <div />
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#f8fafc',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={testing || !apiKey.trim()}
              style={{
                background: testing ? '#94a3b8' : 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: testing ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {testing ? 'Verifying Key...' : 'Verify & Connect Gemini AI'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

