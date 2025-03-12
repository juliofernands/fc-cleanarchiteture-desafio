import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface  from "../../../domain/product/repository/product-repository.interface"
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product('123', 'Product Name', 100);


const product2 = new Product('123', 'Product Name', 100);


const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn(),
		findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
	};
};

describe("Unit test list product use case", () => {
	it("should list products", async () => {
		const repository = MockRepository();
		const listProductsUseCase = new ListProductUseCase(repository);

		const input: InputListProductDto = {};

		const output = await listProductsUseCase.execute(input);
		const expectedOutput: OutputListProductDto = {
			products: [product1.toJSON(), product2.toJSON()],
		};

		expect(output.products.length).toEqual(2);
		expect(output).toEqual(expectedOutput);

		const product1Output = output.products[0];
		const product2Output = output.products[1];

		expect(product1Output.id).toEqual(product1.id);
		expect(product1Output.name).toEqual(product1.name);

		expect(product2Output.id).toEqual(product2.id);
		expect(product2Output.name).toEqual(product2.name);
	});
});