import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import timeForToday from '../../../utils/timeForToday';
import pagePer from '../../../utils/pagePer';

const ProductListBlk = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;

const ProductBox = styled.div`
  width: 177.8px;
  height: 240px;
  border: 1px solid black;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .imageBox {
    width: 163.8px;
    height: 150px;
    margin-bottom: 6px;
    border: 1px solid black;
  }

  .postInfo {
    width: 163.8px;
    height: 68px;
    border: 1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 7px;
    font-size: 15px;
  }

  .prodTitle {
    width: 147.8px;
    height: 26px;
    grid-column: 1 / span 2;
    margin: 0;
    line-height: 26px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prodPrice {
    height: 26px;
    line-height: 26px;
  }

  .betweenTime {
    height: 26px;
    line-height: 26px;
    text-align: right;
    font-size: 13px;
    color: grey;
  }

  .prodTitle {
    text-decoration: none;
    color: black;

    &:hover {
      color: green;
    }
  }
`;

function ProductList({ prods, currentPage }) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pagePer);

  useEffect(() => {
    setStart((currentPage - 1) * pagePer);
    setEnd(currentPage * pagePer);
  }, [currentPage]);

  return (
    <ProductListBlk>
      {prods.length > 0 &&
        prods.slice(start, end).map((prod, index) => (
          <ProductBox key={index}>
            <img alt='' src={prod.image} className='imageBox' />
            <div className='postInfo'>
              <div className='prodTitle'>
                <NavLink
                  to={`/market/product/${prod.p_id}`}
                  className='prodTitle'
                >
                  {prod.title}
                </NavLink>
              </div>
              <div className='prodPrice'>{prod.price}</div>
              <div className='betweenTime'>{timeForToday(prod.regdate)}</div>
            </div>
          </ProductBox>
        ))}
    </ProductListBlk>
  );
}

export default ProductList;
