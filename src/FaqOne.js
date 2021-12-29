import React from 'react'
import {Container, Header, Segment, Divider, Table, Button} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

const FaqOne = () => (
  <div>
  <Container text style={{ marginTop: '7em' }}>
    <Header as='h1'>FAQ</Header>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>'같이가요'는 어떤 사이트인가요?</th>
        </tr>
        <tr>
          <th>국내여행 동행 찾을 땐 '같이가요'!<br/><br/>
            그 동안 동행과 관련없는 포털사이트의 카페, 블로그, 일반 커뮤니티들을 돌아다니며<br/>
            동행을 구하기 위해 힘들어하던 여행인들을 위한 신개념 커뮤니티 사이트 '같이가요'!<br/>
            '같이가요'에서는 타 사이트보다 더 많고 다양한 사람들이 전국 각지 다양한 동행을 구하고 있고,<br/>
            더욱 빠르고 안전하게 동행인을 구할 수 있습니다.<br/><br/>
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

export default FaqOne
