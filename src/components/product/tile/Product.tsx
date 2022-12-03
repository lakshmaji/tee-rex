import React, { FC } from 'react';
import { IProduct } from '../../../types/product';
import Currency from '../../common/Currency';
import ProductCartButton from '../ProductCartButton';

interface Props {
  product: IProduct;
}

const Product: FC<Props> = ({ product }) => {

  return (
    <div className='col-lg-4 col-md-6 pt-md-4 pt-3'>
      <div className='card d-flex flex-column align-items-center rounded-0 shadow border-0'>
        <div className='text-muted text-center mt-auto'>
          <i className='fa fa-circle' style={{ color: product.color }} /> {product.color}
        </div>

        <div className='card-img'>
          <img src={product.imageURL} alt={product.name} />
        </div>
        <div className='card-body pt-5'>
          <div className='font-weight-bold'>{product.name}</div>
          <div className='product-name text-center'>
            {product.quantity > 0 ? `${product.quantity} left` : 'outof stock'}
          </div>
        </div>
        <div className='card-footer d-flex  justify-content-between align-items-center p-0 m-0 w-100 bg-white  border-white product-footer'>
          <div className='price d-flex align-items-center'>
            <span className='text-dark'>
              <Currency amount={product.price} />
            </span>
          </div>
          <ProductCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
