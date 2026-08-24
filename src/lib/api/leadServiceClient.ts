const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Workspace-ID': '11111111-1111-1111-1111-111111111111'
};

export const leadServiceClient = {
    getLeads: async () => fetch('/api/v1/leads', { headers: defaultHeaders }).then(res => res.json()),
    updateLeadStage: async (id: string, stage: string) => 
        fetch(`/api/v1/leads/${id}/stage`, { 
            method: 'PATCH', 
            headers: defaultHeaders,
            body: JSON.stringify({ stage }) 
        }).then(res => res.json()),
    getInternalNotes: async (id: string) => fetch(`/api/v1/leads/${id}/notes`, { headers: defaultHeaders }).then(res => res.json()),
    getPipelineStages: async () => fetch('/api/v1/stages', { headers: defaultHeaders }).then(res => res.json()),
    addInternalNote: async (id: string, body: string) => 
        fetch(`/api/v1/leads/${id}/notes`, { 
            method: 'POST', 
            headers: defaultHeaders,
            body: JSON.stringify({ body }) 
        }).then(res => res.json()),
    getMessages: async (id: string) => fetch(`/api/v1/leads/${id}/messages`, { headers: defaultHeaders }).then(res => res.json()),
};
