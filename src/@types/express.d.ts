declare namespace Express{
    export interface Request{//wir wollen Request überschreiben (eigentlich hängt es das nur an)
        user:{
            id:string
        }

    }
}