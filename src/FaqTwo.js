import React from 'react'
import {Container, Header, Segment, Divider, Table, Button} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

const FaqTwo = () => (
  <div>
  <Container text style={{ marginTop: '7em' }}>
    <Header as='h1'>FAQ</Header>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>홈페이지 이용방법은 어떻게 되나요?</th>
        </tr>
        <tr>
          <th>국내여행 동행 찾을 땐 '같이가요'!<br/><br/>
            먼저 아이디와 비밀번호를 통해 간편회원가입을 한후, 로그인을 합니다.<br/>
            국내여행의 동행을 찾으려면 '국내동행찾기'에서 가고싶은 지역의 글을 찾아 댓글을 남겨주세요!<br/>
            해당 여행의 마스터가 당신에게 회신, 세부내용을 협의하면 됩니다.<br/><br/>
            혹은 동행을 구하지 않고 여행 정보를 추천받고 싶을때는 '여행후기'에서 생생한 정보를 얻으세요!<br/>
            직접 다녀와서 적은 정성적 글과 문화재의 입장료, 운영시간 등 다양한 정보를 얻으실 수 있습니다.<br/><br/>
            다른 사람들과 함께 여행 뿐만 아니라 다양한 이야기를 하고싶다면, '자유게시판'을 이용하세요.<br/>
            궁금하거나 이용에 불편한 점이 있다면, '이용FAQ' 혹은 '문의 및 신고'를 이용하실 수 있습니다.<br/><br/>
            *'고급웹프로그래밍' 프로젝트에는 별개의 개인정보 or 개인정보 인증 및 저장을 넣지 않았습니다.
          </th>
        </tr>
      </thead>
    </table>
    <Link to = '/FaqLayout'>
      <Button style={{ marginTop: '1em' }} className="ui blue button">
        뒤로가기
      </Button>
    </Link>
  </Container>
  </div>
)

export default FaqTwo
