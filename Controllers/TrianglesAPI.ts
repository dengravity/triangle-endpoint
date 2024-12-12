
export class TrianglesAPI {


    async calculateTriangle(request, a: number, b: number, c: number, d?: any) {
        return request.post('/', { data: { a, b, c } });
    }

    async calculateTriangleRaw(request, a?: any, b?: any, c?: any, d?: any) {
        return request.post('/', { data: { a, b, c, d } });
    }

}
