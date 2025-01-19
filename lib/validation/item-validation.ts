import {number, object, string} from 'yup';

const createItemSchema = object({
  minimumStockQuantity: number().typeError('Minimum Stock Quantity must be number').required('Minimum Stock Quantity is required'),
  quantity: number().typeError('Quantity must be number').required('Quantity is required'),
  name: string().required('Name is required'),
});

const updateItemSchema = object({
  minimumStockQuantity: number().typeError('Minimum Stock Quantity must be number').required('Minimum Stock Quantity is required'),
  name: string().required('Name is required'),
});


export async function validateCreateItemSchema(createItem: ICreateItem): Promise<ValidationResult> {
  return await createItemSchema.validate(createItem)
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}

export async function validateUpdateItemSchema(updateItem: IUpdateItem): Promise<ValidationResult> {
  return await updateItemSchema.validate(updateItem)
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}