import "./AddProduct.css";
import Input from "../../components/commons/Input/Input";
import InputCheckbox from "../../components/commons/InputCheckbox/InputCheckbox";

const categories = [
  { id: 1, name: "Sofas and armchairs" },
  { id: 2, name: "Coffee Tables" },
];

const currency = [{ id: 1, name: "USD" }];

function AddProduct() {
  return (
    <div className="addProduct-container container">
      <div className="addProduct-header fs-5 text-uppercase fw-semibold mb-3">
        Add product
      </div>
      <form action="">
        <div>
          <Input
            type="text"
            id="name"
            name="name"
            label="Name"
            classNameLabel="fw-semibold"
          />
        </div>
        <div className="my-3">
          <label
            for="description"
            className="form-label fw-semibold addProduct-label"
          >
            Description
          </label>
          <textarea id="description" name="description" rows="3"></textarea>
        </div>
        <div className="my-3">
          <label htmlFor="image" className="fw-semibold addProduct-label mb-2">
            Photos
          </label>
          <input type="file" id="image" name="image" className="form-control" />
        </div>
        <div className="my-3">
          <select name="category" id="category" className="form-select">
            <option selected>Choose a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3">
          <select name="currency" id="currency" className="form-select">
            <option selected>Choose currency</option>
            {currency.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Input
            type="text"
            id="price"
            name="price"
            label="Price"
            classNameLabel="fw-semibold"
          />
        </div>
        <div>
          <Input
            type="number"
            id="stock"
            name="stock"
            label="Stock"
            classNameLabel="fw-semibold"
          />
        </div>
        <div className="my-3">
          <InputCheckbox
            name="featured"
            label="Is a featured product?"
            id="featured"
            labelClassName="fw-semibold addProduct-label"
          />
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

// Product.init(
//     {

//         name: DataTypes.STRING,
//         description: DataTypes.TEXT,
//         category: DataTypes.STRING,
//         price: DataTypes.DECIMAL,
//         currency: DataTypes.STRING,
//         stock: DataTypes.INTEGER,
//         featured: DataTypes.BOOLEAN,
//         image: {
//             type: DataTypes.JSON,
//             field: 'image',
//             defaultValue: {}
//         },
//     },
//     { sequelize, modelName: "product" }
// );
