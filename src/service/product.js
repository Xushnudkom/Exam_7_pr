import http from "./config";

const product = {
  create: (data) => http.post("/product", data),
  get: (params) => http.get("/products", { params }),
  getById: (id) => http.get(`/product/${id}`, { id }),
  delete: (id) => http.delete(`/product/${id}`, { params: { id } }),
  update: (data) => http.put("/product", data),
};

export default product;
