import '../../css/carRental.css'
import React, { Fragment } from 'react';
import { image } from "../dummy"
import HiringForm from './hiring-form';
function Imglink() {
  return (
    <Fragment>
      {image.imageBrand.map(item => (
        <div className="img-box">
          <img src={item} alt="" key={1} />
        </div>
      ))}
    </Fragment>
  );
}
const dateFormat = 'YYYY/MM/DD';

function CarHomePage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="banner">
        </div>
      </div>
      <div className="container main">
        <div className="form-container">
          <HiringForm/>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="introduction">
              <h4>Các đối tác cho thuê xe</h4>
              <h5>Các đối tác cho thuê xe yêu thích của bạn</h5>
              <p>Chúng tôi hợp tác với các đối tác cho thuê xe uy tín trên toàn thế giới để đưa bạn đến bất kỳ nơi nào bạn muốn</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="brands">
              <Imglink />
            </div>
          </div>
        </div>
        <div className="member">
          <h3>Tại sao nên thuê xe ô tô trên Traveloka?</h3>
          <div className="containerer">
            <div className="row">
              <div className="col-sm">
                <img src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2018/05/14/1526299345537-5d57c269f121ecb9ae60be83d7688d53.svg'} alt="" />
                <span>Tiết kiệm thời gian</span>
                <p>Dễ dàng thuê xe ở bất cứ đâu và bất kỳ khi nào. So sánh xe ô tô từ các đối tác tin cậy của chúng tôi trên một nền tảng, việc tìm kiếm chiếc xe phù hợp với bạn trở nên dễ dàng hơn bao giờ hết.</p>
              </div>
              <div className="col-sm">
                <img src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2018/05/14/1526299395599-27c9f8d3b8b182673dc9768a31eaa1d7.svg'} alt="" />
                <span>Dịch vụ chất lượng cao từ các đối tác tin cậy</span>
                <p>Những đối tác tin cậy của chúng tôi cung cấp dịch vụ chất lượng đảm bảo rằng bạn có một chuyến đi an toàn, thoải mái và đáng nhớ.</p>
              </div>
              <div className="col-sm">
                <img src={process.env.PUBLIC_URL + 'https://ik.imagekit.io/tvlk/image/imageResource/2018/05/14/1526299435281-ee34f2ae4efa6a2e73ebf5a810d5874a.svg'} alt="" />
                <span>Đánh giá thực tế từ người dùng</span>
                <p>Những đánh giá thực tế từ những người dùng khác giúp bạn tìm được xe phù hợp.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="headers">
          <div className="row">
            <div className="col-sm">
              <h3>Thuê xe tự lái</h3>
              <p>Du lịch cùng gia đình hoặc người thân sẽ vui hơn nếu bạn chọn phương tiện di chuyển phù hợp và thuê xe có thể là sự lựa chọn tốt nhất. Nhằm hỗ trợ sự linh hoạt trong khi đi du lịch của bạn, Traveloka hiện cung cấp dịch vụ cho Thuê xe tự lái. Bạn có thể tận hưởng tiện ích này bằng cách đặt trực tiếp qua Ứng dụng Traveloka. Thỏa sức tìm kiếm với nhiều lựa chọn xe tốt nhất kèm bảng giá chi tiết đi kèm.</p>
              <h3>Thuê xe có tài xế</h3>
              <p>Di chuyển thuận tiện là một vấn đề rất quan trọng khi bạn đi du lịch. Đặc biệt khi bạn mong muốn có một chuyến đi dễ dàng, ít rắc rối khi khám phá nhiều địa điểm du lịch thì việc thuê một chiếc xe có tài xế là lựa chọn hợp lý. Cùng với sự phát triển của kĩ thuật số, bạn có thể dễ dàng tận hưởng dịch vụ cho thuê xe thông qua Ứng dụng Traveloka. Dễ dàng so sánh giá từ các đối tác tin cậy của chúng tôi và tìm dịch vụ phù hợp với nhu cầu của mình.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="request">
            <h3 >Yêu cầu chung khi thuê xe</h3>
            <div className="row">
              <div style={{boxShadow:'0 0 1px 0', margin:'10px 0'}} className="col-lg-6 col-sm-12">
                  <div className="he1"><p>Yêu cầu chung khi thuê xe tự lái</p></div>
                  <h5>Bao gồm</h5> 
                  <div className="content col-lg-12 col-sm-12">
                      <ul>
                        <li>bảo hiểm cho xe và khách hàng</li>
                        <li>Thời hạn sử dụng xe tới 24 tiếng cho mỗi ngày thuê</li>
                      </ul>
                      <h5>Không bao gồm</h5>
                      <ul>
                        <li>Chi phí nhiên liệu, đón/trả ngoài trung tâm và yêu cầu bồi thường bảo hiểm</li>
                      </ul>
                      <h5>Địa điểm đón khách</h5>
                      <ul>
                        <li>Miễn phí đón và trả khách tại sân bay và trong trung tâm thành phố</li>
                      </ul>   
                      <h5>Các giấy tờ cần thiết</h5>
                      <ul>
                        <li>Chứng minh nhân dân/hộ chiếu gốc, bằng lái xe, thẻ tín dụng của cá nhân hoặc thẻ tín dụng gia đình (hình chụp thẻ gia đình (KK) hoặc giấy chứng nhận kết hôn phải được chia sẻ với đối tác cho thuê trước khi đón để xác thực thẻ tín dụng của thành viên gia đình)</li>
                      </ul>   
                </div>
              </div>
              <div style={{boxShadow:'0 0 1px 0', margin:'10px 0'}} className="col-lg-6 col-sm-12">
                  <div className="he1"><p>Yêu cầu chung khi thuê xe có tài xế</p></div>
                  <h5>Bao gồm</h5>
                  <div className="content col-lg-12 col-sm-12">
                    <ul>
                      <li>Sử dụng xe trong thành phố</li>
                      <li>Thời gian thuê lên đến 12 tiếng hoặc đến 23:59 cho mỗi ngày thuê xe</li>
                    </ul>
                    <h5>Không bao gồm</h5>
                    <ul>
                      <li>Nhiên liệu, phí đỗ xe, phí cầu đường, phụ cấp ăn của tài xế và tiền tips</li>
                      <li>Phí lưu trú của tài xe trong trường hợp di chuyển ra khỏi khu vực trung tâm</li>
                      <li>Sử dụng xe bên ngoài thành phố</li>
                    </ul>
                    <h5>Địa điểm đón khách</h5>
                    <ul>
                      <li>Miễn phí đón và trả khách ở sân bay và trong trung tâm thành phố</li>
                    </ul>
                    <p>Tài xế sẽ liên lạc với bạn trong khoảng từ 12 - 24 tiếng trước giờ đón khách. Trường hợp thuê xe đi ngay trong ngày, tài xế sẽ liên hệ với bạn nhanh chóng sau khi quá trình đặt xe của bạn được xác nhận.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="FAQ">
          <h1>Câu hỏi thường gặp (FAQ)</h1>
          <details>
            <summary>Tại sao tôi nên thuê xe trên Traveloka?</summary>
            <p>Thuê xe trên Traveloka sẽ giúp bạn tránh khỏi một số rắc rối cũng như tiết kiệm thời gian và tiền bạc. Bạn có thể chọn xe từ các đối tác tin cậy của chúng tôi để khám phá thành phố. Đặt xe phù hợp với nhu cầu trên Traveloka, bạn sẽ nhận được xác nhận tức thì với mức giá tốt nhất.</p>
          </details>
          <details>
            <summary>Làm thể nào để đặt xe trên Traveloka?</summary>
            <ol>
              <h5>Bạn có thể dễ dàng đặt xe với một vài bước đơn giản:</h5>
              <li>Chọn thành phố/khu vực bạn muốn thuê xe, ngày, khoảng thời gian thuê và thời gian đón.</li>
              <li>Chọn loại xe và nhà cung cấp xe ưa thích của bạn.</li>
              <li>Điền thông tin liên hệ hoặc thông tin khách du lịch nếu bạn đặt xe cho người khác.</li>
              <li>Điền thông tin thuê xe.</li>
              <li>Đảm bảo rằng bạn đã điền các thông tin chính xác, sau đó chọn phương thức thanh toán ưa dùng.</li>
              <li>Ngay khi chúng tôi xác thực thanh toán, bạn sẽ nhận được email có voucher điện tử từ Traveloka.</li>
            </ol>
          </details>
          <details>
            <summary>Tôi có thể đặt xe và được đón trong cùng ngày không?</summary>
            <p>Tất nhiên bạn có thể! Tuy nhiên bạn phải đặt ít nhất 12 tiếng trước giờ đón. Tìm hiểu thêm tại trung tâm trợ giúp cho thuê xe.</p>
          </details>
          <details>
            <summary>Làm thế nào để tôi biết liệu tôi có cần đặt gói sử dụng xe ngoài thành phố?</summary>
          </details>
        </div>
      </div>
    </div>
  );
}
export default CarHomePage