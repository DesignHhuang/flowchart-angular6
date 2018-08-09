//软件工具
export interface Tools {
    id: number,
    name?: string,
    version?: string,
    type?: number,
    inputFile?: boolean,
}

//上传的文件
export interface RawData {
    id: number,
    name?: string,
    url?: string,
    createdAt?: Date,
    isDeleted?: boolean,
}