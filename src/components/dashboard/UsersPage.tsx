'use client';

import { useEffect, useState } from 'react';
import { authService } from '@/lib/auth';
import { Search, Filter, MoreVertical, UserCheck, UserX, Mail, Calendar } from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  createdAt: string;
  role?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked'>('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Usar el servicio de autenticación para obtener los headers
        const headers = authService.getAuthHeaders();
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users`, {
          headers,
        });
        
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        setUsers(data.data || []);
      } catch (err) {
        console.error('Error cargando usuarios:', err);
        setError('No se pudieron cargar los usuarios. Verifica tu conexión.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && !user.blocked) ||
                         (filterStatus === 'blocked' && user.blocked);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (blocked: boolean) => (
    <span style={{
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
      background: blocked ? '#fef2f2' : '#f0fdf4',
      color: blocked ? '#dc2626' : '#16a34a',
      border: `1px solid ${blocked ? '#fecaca' : '#bbf7d0'}`
    }}>
      {blocked ? 'Bloqueado' : 'Activo'}
    </span>
  );

  if (loading) {
    return (
      <div style={{ 
        background: '#fff', 
        borderRadius: 16, 
        boxShadow: '0 2px 12px rgba(60,60,120,0.07)', 
        padding: 24, 
        border: '1.5px solid #e2e8f0',
        textAlign: 'center'
      }}>
        <p style={{ color: '#718096', fontSize: 16 }}>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        background: '#fff', 
        borderRadius: 16, 
        boxShadow: '0 2px 12px rgba(60,60,120,0.07)', 
        padding: 24, 
        border: '1.5px solid #e2e8f0',
        textAlign: 'center'
      }}>
        <p style={{ color: '#dc2626', fontSize: 16 }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(60,60,120,0.07)', padding: 24, border: '1.5px solid #e2e8f0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#232946', fontWeight: 600, margin: 0 }}>Gestión de Usuarios</h2>
        <button style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: 14,
          transition: 'all 0.2s ease'
        }}>
          + Nuevo Usuario
        </button>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 250 }}>
          <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 10px 10px 40px',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              fontSize: 14,
              outline: 'none'
            }}
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          style={{
            padding: '10px 16px',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            fontSize: 14,
            outline: 'none',
            background: '#fff'
          }}
        >
          <option value="all">Todos los usuarios</option>
          <option value="active">Solo activos</option>
          <option value="blocked">Solo bloqueados</option>
        </select>
      </div>

      {/* Tabla */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: 12, color: '#718096', fontWeight: 600 }}>Usuario</th>
              <th style={{ textAlign: 'left', padding: 12, color: '#718096', fontWeight: 600 }}>Email</th>
              <th style={{ textAlign: 'left', padding: 12, color: '#718096', fontWeight: 600 }}>Estado</th>
              <th style={{ textAlign: 'left', padding: 12, color: '#718096', fontWeight: 600 }}>Fecha de registro</th>
              <th style={{ textAlign: 'center', padding: 12, color: '#718096', fontWeight: 600 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 12
                    }}>
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 500, color: '#232946' }}>{user.username}</span>
                  </div>
                </td>
                <td style={{ padding: 12, color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Mail size={14} />
                    {user.email}
                  </div>
                </td>
                <td style={{ padding: 12 }}>
                  {getStatusBadge(user.blocked)}
                </td>
                <td style={{ padding: 12, color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={14} />
                    {new Date(user.createdAt).toLocaleDateString('es-ES')}
                  </div>
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    borderRadius: 4,
                    color: '#64748b'
                  }}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estado vacío */}
      {filteredUsers.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
          <p>No se encontraron usuarios que coincidan con los filtros.</p>
        </div>
      )}
    </div>
  );
} 