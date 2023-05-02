// NOTE: Todos estas variables solo pueden ser usados en el modulo dentro de nest o BuilddigBlock
export const EnvConfiguration=()=>({
    environment:process.env.NODE_ENV||'dev',
    mogodb:process.env.MONGODB,
    port:process.env.PORT||3002,
    defaultLimit: +process.env.DEFAULT_LIMIT||7,
})

// const envfb=()=>{
//     return {

//     }
// }
