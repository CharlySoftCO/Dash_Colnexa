// Servicio para consumir la API de Strapi para el CRUD de servicios

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'https://sstrapiss.colnexa.com.co';

export interface Service {
  id: number;
  title: string;
  description: string;
}

// Obtener JWT del localStorage (ajusta según tu lógica de auth)
function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt');
  }
  return null;
}

export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) {
    throw new Error('Error al obtener servicios');
  }
  return res.json();
}

export async function createService(data: { title: string; description: string; }): Promise<Service> {
  const token = getToken();
  const res = await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Error al crear servicio');
  }
  return res.json();
}

export async function updateService(id: number, data: { title: string; description: string; }): Promise<Service> {
  const token = getToken();
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Error al actualizar servicio');
  }
  return res.json();
}

export async function deleteService(id: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error('Error al eliminar servicio');
  }
}
