#!/bin/bash

# 도구별 가이드 버튼 추가 스크립트

TOOLS=("timestamp" "base64" "uuid" "hash" "color")

for tool in "${TOOLS[@]}"; do
  FILE="app/tools/$tool/page.tsx"

  if [ ! -f "$FILE" ]; then
    echo "❌ $FILE not found"
    continue
  fi

  echo "📝 Processing $tool..."

  # 1. Import 추가 (이미 있으면 스킵)
  if ! grep -q "ToolGuideModal" "$FILE"; then
    # 마지막 import 라인 찾기
    LAST_IMPORT_LINE=$(grep -n "^import" "$FILE" | tail -1 | cut -d: -f1)

    # ToolGuideModal import 추가
    sed -i "" "${LAST_IMPORT_LINE}a\\
import ToolGuideModal from '@/components/tools/ToolGuideModal';
" "$FILE"
    echo "  ✅ Added import"
  else
    echo "  ⏭️  Import already exists"
  fi

  echo "  ℹ️  가이드 버튼은 수동으로 각 페이지 헤더에 추가해주세요"
done

echo ""
echo "✨ Script completed!"
echo "📌 다음 단계: 각 도구 페이지에서 제목 옆에 <ToolGuideModal toolId=\"$tool\" /> 추가"
