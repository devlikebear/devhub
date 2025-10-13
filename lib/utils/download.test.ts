import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadTextFile } from './download';

describe('downloadTextFile', () => {
  let clickMock: ReturnType<typeof vi.fn>;
  let appendChildSpy: ReturnType<typeof vi.fn>;
  let removeChildSpy: ReturnType<typeof vi.fn>;
  let anchorMock: HTMLAnchorElement & { style: Record<string, string> };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();

    clickMock = vi.fn();
    appendChildSpy = vi.fn();
    removeChildSpy = vi.fn();
    anchorMock = {
      href: '',
      download: '',
      style: {},
      click: clickMock,
    } as unknown as HTMLAnchorElement & { style: Record<string, string> };

    const urlStub = {
      createObjectURL: vi.fn(() => 'blob:mock'),
      revokeObjectURL: vi.fn(),
    };
    vi.stubGlobal('document', {
      createElement: vi.fn((tagName: string) => {
        if (tagName === 'a') {
          return anchorMock;
        }
        throw new Error(`Unsupported tag: ${tagName}`);
      }),
      body: {
        appendChild: appendChildSpy,
        removeChild: removeChildSpy,
      },
    });

    vi.stubGlobal('URL', urlStub);
    vi.stubGlobal('window', { URL: urlStub });
  });

  it('creates an anchor element and triggers download', async () => {
    await downloadTextFile('sample text', 'decoded.txt');

    const createObjectURL = (URL.createObjectURL as ReturnType<typeof vi.fn>);
    expect(createObjectURL).toHaveBeenCalledTimes(1);

    const blobArgument = createObjectURL.mock.calls[0][0] as Blob;
    expect(blobArgument).toBeInstanceOf(Blob);
    await expect(blobArgument.text()).resolves.toBe('sample text');

    expect(appendChildSpy).toHaveBeenCalledWith(anchorMock);
    expect(clickMock).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalledWith(anchorMock);
    expect(anchorMock.download).toBe('decoded.txt');
    expect(anchorMock.href).toBe('blob:mock');
    const revokeObjectURL = URL.revokeObjectURL as ReturnType<typeof vi.fn>;
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
});
