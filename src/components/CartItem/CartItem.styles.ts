import styled from "styled-components";

export const CartItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  padding: 0px 10px;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;
