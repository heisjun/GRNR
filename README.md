# gardner's club
식물 관리 기능을 제공하고 식물 집사님들과 식물팁을 공유하며 소통할 수 있는 커뮤니티를 제공하는 식물 관리 & 커뮤니티 플랫폼입니다.

## 개발기간 & 개발환경 & 구성원

22.08 ~23.04


React, TypeScript, Styled-Component, Recoil


PM1, 프론트2, 백엔드2, 디자이너1

## 주요기능 및 구현내용

- **페이지 전체적인 레이아웃 디자인 및 성능개선**
    - [Media Query를 이용한 동적웹페이지 구현](https://www.notion.so/CSS-Styled-Components-a09c519f714346d39999b8bd0a65f441?pvs=21)
    - [이미지 최적화를 통해 초기로딩속도 2.4초 → 1.1초로 개선](https://www.notion.so/Lazy-Loading-daa56f1f4bad4ced8c8cc97bfbbef899?pvs=21)
- **회원가입/ 로그인 페이지 구현**
    - 회원가입시 정규표현식을 이용한 유효성 검사
    - [Kakao/Naver API를 이용한 OAuth2.0 로그인 구현](https://www.notion.so/d0d008385a864f0a907d9dc334cb50f0?pvs=21)
    - [Blocker 기능을 통한 페이지 전환 방지 구현](https://www.notion.so/Blocker-206d25f97f004a7f8905492dba0c17d2?pvs=21)
    - [디바운스 함수를 이용한 주소 자동완성기능 구현](https://www.notion.so/8868b95ce5ef4a3bab43852c4fa81b13?pvs=21)
    - [Recoil을 이용한 로그인 상태관리](https://www.notion.so/Recoil-6fb883b8a94d433b97b99b1d80c686c3?pvs=21)
- **식물사전 페이지 구현**
    - [방대한 식물사전 데이터를 처리하기 위해 useInView를 활용하여 무한스크롤 기능 구현](https://www.notion.so/useInView-Infinite-Scroll-7b7169e684704b9ba4e19d91eba4ce64?pvs=21)
    - [쿼리스트링을 조작하여 식물 필터링 구현, 필터링을 이용하여 식물사전 데이터 효율적으로 관리](https://www.notion.so/useSearchParams-13ca4c4417a142658fea7cde70a30841?pvs=21)
- **사진페이지 구현**
    - [비동기 HTTP 요청과 AWS S3 업로드 기능을 구현](https://www.notion.so/7b9939139a7c4b4c928d4dc2d998e9f5?pvs=21)
- **커뮤니티 페이지 구현**
    - RESTful API를 이용한 백엔드 서버와 비동기 통신
    - [자주 사용되는 캐러셀을 컴포넌트화 하여 재사용성 향상](https://www.notion.so/Carousel-ca4cc3bd2b214fd78b8629b6a3a1810b?pvs=21)

## 프로젝트를 진행하며 느낀점
여러 직군과의 협업을 진행하며 다양한 협업툴을 경험해보았고, 이 과정에서 개발자란 개발만 잘 하는것이 아닌 다양한 직군과의 원활한 의사소통도 중요하다는 것을 알게되었습니다.
또한 이번 프로젝트에서 초기 로딩속도를 개선하기 위해 이미지 최적화와 무한스크롤을 통해 문제를 해결한 것이 제일 기억에 남는데, 1.3초라는 시간이 무척 짧아보이지만 이를 단축시키기 위해 다양한 방법을 모색하고,
적용 하기까지 많은 노력이 필요했습니다.이 과정에서 더 큰 리소스를 가지고 서비스 하는 페이지들은 성능을 개선하기 위해 어떤 방식을 택하고 있을지 궁금했고, 관련해서 더 공부해 보고자 생각했습니다. 마지막으로 다양한 요구사항들을 직접 구현해 보며 앞으로도 어려워만 보이던 구현을 장벽처럼 느끼지 않고 시도해 볼 수 있는 용기를 가지게 되었습니다.
