export const EnvConfiguration = ()=>({
    enviroment: process.env.NODE_ENV || 'dev',
    type: process.env.TYPE,
    host:process.env.HOST,
    dbPort:process.env.DBPORT,
    dbUsername:process.env.DBUSERNAME,
    password:process.env.PASSWORD,
    dataBase:process.env.DATABASE,
    entities:process.env.ENTITIES,
    synchronize:process.env.SYNCHRONIZE,
    port:process.env.PORT,
    secret: process.env.SECRET
})