import React, { useState } from 'react';
import {
  PackageCheck,
  AlertCircle,
  CheckCircle,
  Send,
  Plus,
  RefreshCw,
  Archive,
  Pill
} from 'lucide-react';

export default function ANMMedicineStockView() {
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inventory, setInventory] = useState([
    {
      id: 'STK-01',
      name: 'Glucometer Blood Sugar Strips',
      category: 'Diagnostic Strip',
      currentStock: 18,
      optimalStock: 50,
      unit: 'Strips',
      status: 'LOW',
      reorderLevel: 20
    },
    {
      id: 'STK-02',
      name: 'Rapid Malaria Antigen (Pf/Pv) Test Kits',
      category: 'Diagnostic Kit',
      currentStock: 14,
      optimalStock: 30,
      unit: 'Kits',
      status: 'ADEQUATE',
      reorderLevel: 10
    },
    {
      id: 'STK-03',
      name: 'Rapid Pregnancy Test (Nishchay) Kits',
      category: 'MCH Kit',
      currentStock: 8,
      optimalStock: 25,
      unit: 'Kits',
      status: 'LOW',
      reorderLevel: 10
    },
    {
      id: 'STK-04',
      name: 'Iron & Folic Acid (IFA) Red Tablets',
      category: 'Maternal Nutrition',
      currentStock: 260,
      optimalStock: 500,
      unit: 'Tablets',
      status: 'ADEQUATE',
      reorderLevel: 150
    },
    {
      id: 'STK-05',
      name: 'Zinc Tablets (20mg) & ORS Sachets',
      category: 'Child Care / Diarrhea',
      currentStock: 68,
      optimalStock: 100,
      unit: 'Sets',
      status: 'ADEQUATE',
      reorderLevel: 30
    },
    {
      id: 'STK-06',
      name: 'Paracetamol 500mg Tablets',
      category: 'Essential Analgesic',
      currentStock: 120,
      optimalStock: 200,
      unit: 'Tablets',
      status: 'ADEQUATE',
      reorderLevel: 50
    },
    {
      id: 'STK-07',
      name: 'Disposable Tongue Depressors (Oral Cancer Check)',
      category: 'Screening Consumable',
      currentStock: 32,
      optimalStock: 100,
      unit: 'Pieces',
      status: 'LOW',
      reorderLevel: 40
    }
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleReorderIndent = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showNotification('Indent submitted successfully to PHC Medical Officer & Drug Warehouse!');
    }, 1000);
  };

  return (
    <div style={{ padding: '24px', background: '#f8fafc' }}>
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: '#0d9488',
            color: '#ffffff',
            padding: '12px 22px',
            borderRadius: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            zIndex: 9999,
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER & REORDER BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
            ANM Field Medicine Kit &amp; Diagnostic Strip Inventory
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
            Sub-Centre Paderu Field Kit Status • Synced with e-Aushadhi Drug Supply System
          </p>
        </div>

        <button
          onClick={handleReorderIndent}
          disabled={isSubmitting}
          style={{
            background: 'linear-gradient(100deg, #ea580c, #c2410c)',
            color: '#ffffff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '30px',
            fontWeight: 800,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)'
          }}
        >
          <Send size={16} />
          <span>{isSubmitting ? 'Sending Indent...' : 'Submit Restock Indent to PHC'}</span>
        </button>
      </div>

      {/* INVENTORY TABLE */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
            Field Consumables &amp; Medicine Stock Register
          </h4>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Item Name</th>
                <th style={{ padding: '12px 18px' }}>Category</th>
                <th style={{ padding: '12px 18px' }}>Current Quantity</th>
                <th style={{ padding: '12px 18px' }}>Optimal Buffer</th>
                <th style={{ padding: '12px 18px' }}>Stock Level</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => {
                const percent = Math.min(100, Math.round((item.currentStock / item.optimalStock) * 100));
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 18px', fontWeight: 800, color: '#0f172a' }}>
                      {item.name}
                    </td>
                    <td style={{ padding: '12px 18px', color: '#64748b' }}>
                      {item.category}
                    </td>
                    <td style={{ padding: '12px 18px', fontWeight: 700, color: item.status === 'LOW' ? '#dc2626' : '#0f172a' }}>
                      {item.currentStock} {item.unit}
                    </td>
                    <td style={{ padding: '12px 18px', color: '#475569' }}>
                      {item.optimalStock} {item.unit}
                    </td>
                    <td style={{ padding: '12px 18px', width: '180px' }}>
                      <div style={{ background: '#f1f5f9', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${percent}%`,
                            background: item.status === 'LOW' ? '#dc2626' : '#16a34a',
                            height: '100%',
                            borderRadius: '10px'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{percent}% of quota</span>
                    </td>
                    <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                      {item.status === 'LOW' ? (
                        <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '14px', fontSize: '0.72rem', fontWeight: 800 }}>
                          ⚠️ Low Stock
                        </span>
                      ) : (
                        <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 10px', borderRadius: '14px', fontSize: '0.72rem', fontWeight: 700 }}>
                          ✓ Sufficient
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
