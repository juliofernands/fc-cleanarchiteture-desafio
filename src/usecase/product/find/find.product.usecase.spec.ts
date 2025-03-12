import  Product  from "../../../domain/product/entity/product"
import  FindProductUseCase  from "../find/find.product.usecase"
import { InputFindProductDto } from "./find.product.dto";

const product = new Product('123', 'Product Name', 100);


const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
	};
};

describe("Unit test find product use case", () => {
	

	it("should find a product", async () => {
		const repository = MockRepository();
		const findProductUseCase = new FindProductUseCase(repository);

		const input: InputFindProductDto = {
			id: product.id,
		};

		const result = await findProductUseCase.execute(input);

		expect(result).toEqual(product.toJSON());
	});
});