import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
    height: 26px;
    grid-column: 1 / span 2;
    margin: 0;
    line-height: 26px;
    font-weight: bold;
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

function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }
  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

function ProductList({ prods }) {
  return (
    <ProductListBlk>
      {prods.length > 0 &&
        prods.map((prod, index) => (
          <ProductBox key={index}>
            <div className='imageBox'></div>
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
