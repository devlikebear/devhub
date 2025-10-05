'use client';

import { useState } from 'react';
import { createShareUrl, isSafeToShare } from '@/lib/utils/urlParams';

interface ShareButtonProps {
  /**
   * 공유할 데이터 (key-value 쌍)
   */
  data: Record<string, string>;

  /**
   * 버튼 레이블 (기본값: "공유")
   */
  label?: string;

  /**
   * 버튼 클래스명
   */
  className?: string;
}

export default function ShareButton({ data, label = '공유', className = '' }: ShareButtonProps) {
  const [copyMessage, setCopyMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleShare = async () => {
    // 데이터 검증
    const dataString = JSON.stringify(data);
    const safetyCheck = isSafeToShare(dataString);

    if (!safetyCheck.safe) {
      setShowWarning(true);
      setCopyMessage(`⚠️ ${safetyCheck.reason}`);
      setTimeout(() => {
        setShowWarning(false);
        setCopyMessage('');
      }, 5000);
      return;
    }

    // 공유 URL 생성
    const shareUrl = createShareUrl(data);

    // 클립보드에 복사
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyMessage('✓ URL이 클립보드에 복사되었습니다!');
      setTimeout(() => setCopyMessage(''), 3000);
    } catch {
      setCopyMessage('✗ 복사에 실패했습니다');
      setTimeout(() => setCopyMessage(''), 3000);
    }
  };

  const baseClassName = `px-4 py-2 rounded-lg font-semibold transition-colors ${className}`;
  const buttonClassName = showWarning
    ? `${baseClassName} bg-yellow-600 hover:bg-yellow-700 text-white`
    : `${baseClassName} bg-blue-600 hover:bg-blue-700 text-white`;

  return (
    <div className="inline-block">
      <button
        onClick={handleShare}
        className={buttonClassName}
        title="현재 상태를 URL로 공유"
      >
        🔗 {label}
      </button>

      {copyMessage && (
        <div
          className={`mt-2 text-sm ${
            showWarning ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
          }`}
        >
          {copyMessage}
        </div>
      )}
    </div>
  );
}
