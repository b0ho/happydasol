# happydasol

김다솔 × 이나영의 결혼을 축하하는 모바일 청첩장.  
친구/가족이 결혼하는 사람을 위해 만드는 헌정 페이지로, 축하 메시지와 사진을 함께 남길 수 있습니다.

## 구조

```
happydasol/
├── index.html          # 청첩장 (React + Babel CDN, 단일 파일)
├── server.js           # Express 백엔드
├── assets/
│   └── bgm.mp3         # 배경음악
├── project/            # 디자인 원본 (로컬 전용)
│   ├── assets/
│   │   └── hero-couple.jpeg
│   └── ...
└── docs/
    └── chat1.md        # 기획 대화 기록
```

런타임 생성 (git 제외):
- `wedding.db` — SQLite (로컬) / `/data/wedding.db` (운영)
- `uploads/` — 업로드 사진 (로컬) / `/data/uploads/` (운영)

## 로컬 실행

```bash
npm install
node server.js
# http://localhost:3000
```

## 배포

Railway에 연결된 GitHub 저장소로 `main` 브랜치에 푸시하면 자동 배포됩니다.

운영 URL: `https://happydasol-production.up.railway.app`

Railway 환경변수:
- `DATA_DIR=/data` — 볼륨 마운트 경로 (데이터 영속성)
- `ADMIN_TOKEN` — 관리자 API 인증 토큰

## 기능

- 히어로 포스터 + 배경음악 자동재생
- 축하 메시지 작성 및 목록 보기
- 사진 업로드 및 갤러리 (장당 5MB, 1인 30장 제한)
- IP 기반 rate limiting

## 관리자 API

모든 요청에 `x-admin-token: <ADMIN_TOKEN>` 헤더 필요.

```
GET    /api/admin/messages        # 메시지 전체 조회
PATCH  /api/admin/messages/:id    # 메시지 수정 { nickname?, text? }
DELETE /api/admin/messages/:id    # 메시지 삭제

GET    /api/admin/photos          # 사진 전체 조회
PATCH  /api/admin/photos/:id      # 사진 수정 { caption?, nickname? }
DELETE /api/admin/photos/:id      # 사진 삭제 (파일도 함께 제거)
```
