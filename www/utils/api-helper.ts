import { PrismaClient } from '@prisma/client'
import { GetDate } from '../utils/date-helper'
const prisma = new PrismaClient()
export const ApiRequestLog = async (master_api_id: number, request: any, token: string|null=null) => {
    request = JSON.stringify(request, (key, value) =>
    typeof value === 'bigint'
        ? value.toString()
        : value 
    )
    let now = GetDate("in")
    let master_api_logs = await prisma.master_api_logs.create({
        data:{
            master_api_id: master_api_id,
            token: token,
            request: request,
            status: 1,
            created_at: now
        }
    })
    return master_api_logs
}
export const ApiResponseLog = async (master_api_log_id: number, response: any, token: string|null=null) => {
    response = JSON.stringify(response, (key, value) =>
    typeof value === 'bigint'
        ? value.toString()
        : value 
    )
    let now = GetDate("in")
    let token_obj = {}
    if(token){
        token_obj = {token: token}
    }
    let master_api_logs = await prisma.master_api_logs.update({
        where:{
            id: master_api_log_id
        },
        data:{
            response: response,
            ...token_obj,
            updated_at: now
        }
    })
    return master_api_logs
}