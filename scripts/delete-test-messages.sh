#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${API_URL:-https://happydasol.kro.kr}"
TOKEN="${ADMIN_TOKEN:-}"

if [[ -z "$TOKEN" ]]; then
  echo "Usage: ADMIN_TOKEN=<token> bash delete-test-messages.sh"
  exit 1
fi

echo "=== 전체 메시지 조회 ==="
MESSAGES=$(curl -sf -H "x-admin-token: $TOKEN" "$BASE_URL/api/admin/messages")

echo "$MESSAGES" | python3 -c "
import json, sys

messages = json.load(sys.stdin)
test_ids = []

print(f'총 {len(messages)}개 메시지\n')
print('{:<6} {:<20} {}'.format('ID', 'Nickname', 'Text'))
print('-' * 70)

for m in messages:
    nick = m['nickname']
    is_test = 'test' in nick.lower() or '테스트' in nick
    marker = ' <<< TEST' if is_test else ''
    print('{:<6} {:<20} {}{}'.format(m['id'], nick, m['text'][:30], marker))
    if is_test:
        test_ids.append(m['id'])

print()
if not test_ids:
    print('test 닉네임 메시지 없음.')
    sys.exit(0)

print(f'삭제 대상 ID: {test_ids}')
" || { echo "메시지 조회 실패"; exit 1; }

# test 닉네임 ID 추출
TEST_IDS=$(echo "$MESSAGES" | python3 -c "
import json, sys
messages = json.load(sys.stdin)
ids = [str(m['id']) for m in messages if 'test' in m['nickname'].lower() or '테스트' in m['nickname']]
print(' '.join(ids))
")

if [[ -z "$TEST_IDS" ]]; then
  echo "삭제할 test 닉네임 메시지가 없습니다."
  exit 0
fi

echo ""
read -p "위 메시지들을 삭제하시겠습니까? (y/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "취소됨."
  exit 0
fi

echo ""
echo "=== 삭제 중 ==="
for ID in $TEST_IDS; do
  RESULT=$(curl -sf -X DELETE -H "x-admin-token: $TOKEN" "$BASE_URL/api/admin/messages/$ID")
  echo "ID $ID 삭제 완료: $RESULT"
done

echo ""
echo "완료."
