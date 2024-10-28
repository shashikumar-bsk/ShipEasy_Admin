
const env= "prod"
export const config = env == "prod" ? "http://localhost:3000" :""
export default config
export const adminToken='admintoken'