
export class TrianglesAPI {


    async sendCorrectTriangleRequest(request, a: number, b: number, c: number, d?: any) {
        return request.post('/', { data: { a, b, c } });
    }

    async sendWrongTriangleRequest(request, a?: any, b?: any, c?: any, d?: any) {
        return request.post('/', { data: { a, b, c, d } });
    }

}
