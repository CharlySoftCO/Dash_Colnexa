'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getServices, createService, updateService, deleteService, Service } from '@/lib/services';
import { authService } from '@/lib/auth';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState<{ title: string; description: string }>({ title: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      setAuthError('No tienes una sesión activa. Por favor inicia sesión.');
      setLoading(false);
      return;
    }
    if (authService.isSessionExpired()) {
      setAuthError('Tu sesión ha expirado. Por favor vuelve a iniciar sesión.');
      authService.logout();
      setLoading(false);
      return;
    }
    fetchServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [services, searchTerm]);

  async function fetchServices() {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices();
      setServices(data);
    } catch {
      setError('Error al cargar servicios');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los servicios. Intenta nuevamente.',
        confirmButtonColor: '#0d6efd',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openModal(service?: Service) {
    setSuccess(null);
    setError(null);
    if (service) {
      setForm({ title: service.title, description: service.description });
      setEditingId(service.id);
    } else {
      setForm({ title: '', description: '' });
      setEditingId(null);
    }
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setForm({ title: '', description: '' });
    setEditingId(null);
    setError(null);
    setSuccess(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError('Todos los campos son obligatorios');
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios.',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      if (editingId) {
        await updateService(editingId, form);
        setSuccess('Servicio actualizado correctamente');
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El servicio se ha actualizado correctamente.',
          confirmButtonColor: '#0d6efd',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await createService(form);
        setSuccess('Servicio creado correctamente');
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'El servicio se ha creado correctamente.',
          confirmButtonColor: '#0d6efd',
          timer: 2000,
          showConfirmButton: false,
        });
      }
      closeModal();
      fetchServices();
    } catch {
      setError('Error al guardar el servicio');
      setSuccess(null);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el servicio. Intenta nuevamente.',
        confirmButtonColor: '#0d6efd',
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer. El servicio será eliminado permanentemente.',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      try {
        await deleteService(id);
        setSuccess('Servicio eliminado correctamente');
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El servicio se ha eliminado correctamente.',
          confirmButtonColor: '#0d6efd',
          timer: 2000,
          showConfirmButton: false,
        });
        fetchServices();
      } catch {
        setError('Error al eliminar el servicio');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el servicio. Intenta nuevamente.',
          confirmButtonColor: '#0d6efd',
        });
      } finally {
        setSubmitting(false);
      }
    }
  }

  function viewService(service: Service) {
    Swal.fire({
      title: service.title,
      html: `
        <div class="text-start">
          <p class="text-secondary mb-2"><strong>Descripción:</strong></p>
          <p class="text-dark">${service.description || 'Sin descripción'}</p>
        </div>
      `,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: 'Cerrar',
    });
  }

  if (authError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center mx-auto" style={{ maxWidth: 400 }}>
          <h2 className="h4 mb-3">Acceso restringido</h2>
          <p className="mb-4">{authError}</p>
          <Link href="/" className="btn btn-primary">Ir al login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="bg-white p-4 rounded shadow border">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
          <div>
            <h1 className="h2 fw-bold text-dark mb-1">Gestión de Servicios</h1>
            <p className="text-secondary mb-0">Administra y organiza todos los servicios de la plataforma</p>
          </div>
          <button
            onClick={() => openModal()}
            className="btn btn-primary d-flex align-items-center gap-2"
          >
            <Plus size={20} /> Nuevo Servicio
          </button>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-2 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-md-end text-secondary">
            <span className="me-2">{filteredServices.length} de {services.length} servicios</span>
          </div>
        </div>

        {success && <div className="alert alert-success text-center">{success}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Servicio</th>
                <th>Descripción</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-5">
                    <div className="d-flex flex-column align-items-center gap-2">
                      <Plus size={32} className="text-primary mb-2" />
                      <div className="fw-semibold mb-1">
                        {searchTerm ? 'No se encontraron servicios' : 'No hay servicios registrados'}
                      </div>
                      <div className="text-secondary mb-2">
                        {searchTerm
                          ? 'Intenta con otros términos de búsqueda'
                          : 'Comienza creando tu primer servicio'}
                      </div>
                      {!searchTerm && (
                        <button
                          onClick={() => openModal()}
                          className="btn btn-primary"
                        >
                          Crear primer servicio
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div className="fw-semibold">{service.title}</div>
                    </td>
                    <td>
                      <div className="text-secondary">
                        {service.description || <span className="fst-italic text-muted">Sin descripción</span>}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() => viewService(service)}
                          className="btn btn-outline-secondary btn-sm"
                          title="Ver detalles"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal(service)}
                          className="btn btn-outline-warning btn-sm"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="btn btn-outline-danger btn-sm"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Bootstrap */}
        {modalOpen && (
          <>
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 1040,
              }}
            />
            <div
              className="modal fade show"
              style={{ display: 'block', zIndex: 1050 }}
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{editingId ? 'Editar Servicio' : 'Nuevo Servicio'}</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Título del Servicio *</label>
                        <input
                          name="title"
                          className="form-control"
                          placeholder="Ej: Consultoría Web"
                          value={form.title}
                          onChange={handleChange}
                          disabled={submitting}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Descripción *</label>
                        <textarea
                          name="description"
                          className="form-control"
                          placeholder="Describe el servicio en detalle..."
                          value={form.description || ""}
                          onChange={handleChange}
                          disabled={submitting}
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={closeModal} disabled={submitting}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
