import  ProductFactory  from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDto } from "./update.product.dto";
import  UpdateProductUseCase  from "./update.product.usecase";

const product = ProductFactory.create("a",
	"Shirt",
	10);

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
	};
};

describe("Unit test update product use case", () => {

	

	it("should update a product", async () => {
		const repository = MockRepository();
		const updateProductUseCase = new UpdateProductUseCase(repository);

		const input: InputUpdateProductDto = {
			id: product.id,
			name: "Shirt Updated",
			price: 20,
		};

		const output = await updateProductUseCase.execute(input);

		expect(output.id).toEqual(product.id);
		expect(output.name).toEqual(input.name);
		expect(output.price).toEqual(input.price);
	});

	it("should update a product only name", async () => {
		const repository = MockRepository();
		const updateProductUseCase = new UpdateProductUseCase(repository);

		const input: InputUpdateProductDto = {
			id: product.id,
			name: "Shirt Updated Only Name",
            price:10
		};

		const output = await updateProductUseCase.execute(input);

		expect(output.id).toEqual(product.id);
		expect(output.name).toEqual(input.name);
		expect(output.price).toEqual(product.price);
	});

	it("should update a product only price", async () => {
		const repository = MockRepository();
		const updateProductUseCase = new UpdateProductUseCase(repository);

		const input: InputUpdateProductDto = {
			id: product.id,
            name: "Shirt",
			price: 20,
		};

		const output = await updateProductUseCase.execute(input);

		expect(output.id).toEqual(product.id);
		expect(output.name).toEqual(product.name);
		expect(output.price).toEqual(input.price);
	});
});