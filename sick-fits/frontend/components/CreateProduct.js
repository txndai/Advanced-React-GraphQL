import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in? And what types are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'narc shoes',
    price: 123,
    description: 'hello',
    image: '',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );
  console.log(createProduct);

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // submit the input fields to the backend
        await createProduct();
        clearForm();
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
