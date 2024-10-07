import { Api, ApiListResponse } from "./base/api";
import { IProduct, IOrder, IOrderSuccess, IApi } from "../types";

export class ActionApi extends Api implements IApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	async getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image
			}))
		);
	}

	async getProduct(id: string): Promise<IProduct> {
		return (await this.get(`/product/${id}`)) as IProduct;
	}

	async createOrder(order: IOrder): Promise<IOrderSuccess> {
		return (await this.post('/order', order)) as IOrderSuccess;
	}
	
}