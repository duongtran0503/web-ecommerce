import html from "../../core/core.js";
const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Home = () => {
  return html`
    ${value.map(
      (value) => `
      <div class="card-cpc">
      <div class="card-image-cpc">
        <img src="" alt="product" />
      </div>
      <div class="card-description-cpc">
        <div class="card-des-content-cpc">
          <div class="card-title">
            <h3>Laptop CHUWI GemiBook Celeron J4125</h3>
          </div>
          <div class="card-des-cpc">
            <p>8GB/256GB/13''IPS/Win 10</p>
          </div>
          <div class="card-price-cpc">
            <h3>4.690.000₫</h3>
          </div>
        </div>
        <div class="card-button-cpc">
          <button>Thêm vào giỏ hàng</button>
          <button class="seemore">Show</button>
        </div>
      </div>
    </div>

     `
    )}
  `;
};
export default Home;
