import server from "./_server";

export const BillOfLadingService = {
    async Status() {
        const response = await server.get("/BillOfLading/Status");
        
        return response.data;
    },

    
    async ValidateDraft(item) {
        const response = server.post("/BillOfLading/ValidateDraft", item);
        return response;
    },
};