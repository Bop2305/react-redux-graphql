import React from "react";

const TransferIcon = ({ color }: { color?: string }) => {
  return (
    <>
      <svg
        width="21"
        height="25"
        viewBox="0 0 21 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1330_7385)">
          <path
            d="M19.9664 9.32871C18.8878 9.35716 18.0129 10.1829 17.8881 11.292C17.8422 11.6993 17.8415 12.1126 17.8389 12.5232C17.8325 13.5643 17.8325 14.6054 17.8396 15.6459C17.8415 15.8948 17.7562 16.0753 17.5557 16.2227C16.9905 16.6379 16.4337 17.0659 15.8699 17.483C15.1087 18.0469 14.7337 18.7977 14.7369 19.7457C14.7414 21.2142 14.7382 22.6828 14.7376 24.152C14.7376 24.6131 14.574 24.7747 14.1084 24.7747C11.0917 24.7747 8.07442 24.7754 5.05778 24.7747C4.2223 24.7747 3.70368 24.2509 3.70045 23.4135C3.69915 23.0831 3.78322 22.7158 3.66553 22.4325C3.54784 22.1493 3.22774 21.9495 2.99495 21.7154C2.56815 21.2867 2.14459 20.854 1.71069 20.4324C1.10348 19.8433 0.857749 19.1424 1.09442 18.3217C1.3311 17.5005 1.91438 17.0368 2.78543 16.8571C2.52159 16.5926 2.27522 16.3436 2.0269 16.0973C1.7081 15.7817 1.49535 15.4079 1.42745 14.9624C1.26191 13.8708 1.89757 12.9189 2.97037 12.6428C3.02404 12.6292 3.07836 12.617 3.18894 12.5911C2.94192 12.3512 2.71818 12.1352 2.49573 11.9166C2.34053 11.764 2.18663 11.6095 2.03337 11.4543C0.9444 10.3485 1.2923 8.65812 2.73046 8.06449C2.75956 8.05285 2.78672 8.03669 2.83845 8.01147C2.77056 7.93904 2.71494 7.87567 2.65545 7.81618C2.00686 7.16435 1.33757 6.53127 0.712898 5.85746C-0.328218 4.73357 0.194927 2.93587 1.66736 2.52783C2.33471 2.34288 2.94321 2.48709 3.4877 2.91C3.5446 2.95462 3.59957 3.00247 3.65583 3.04774C3.65906 3.05033 3.67005 3.04451 3.70109 3.0361C3.70109 2.66751 3.70045 2.29115 3.70109 1.91545C3.70368 1.08191 4.22682 0.560702 5.06554 0.560055C8.86464 0.559409 12.6637 0.559409 16.4635 0.560055C17.3158 0.560055 17.8363 1.07932 17.8363 1.93097C17.8376 4.26281 17.8363 6.59529 17.8363 8.92713C17.8363 9.01508 17.8363 9.10238 17.8363 9.22912C17.9223 9.1651 17.9831 9.12242 18.0413 9.07586C18.7488 8.50939 19.5745 8.31346 20.4585 8.31281C20.7224 8.31281 20.9086 8.50681 20.9312 8.77064C20.9377 8.84307 20.9338 8.91549 20.9338 8.98857C20.9338 14.0241 20.9338 19.0596 20.9338 24.0951C20.9338 24.5387 20.7734 24.767 20.4579 24.7728C20.1345 24.7786 19.9658 24.5439 19.9658 24.0873C19.9658 19.2697 19.9658 14.4522 19.9658 9.63457V9.32935L19.9664 9.32871ZM13.7443 19.9332C13.7579 19.8879 13.7656 19.8731 13.7663 19.8582C13.7689 19.8097 13.7695 19.7612 13.7695 19.7133C13.7773 18.4672 14.2778 17.4695 15.2749 16.7219C15.7399 16.3734 16.199 16.0184 16.6698 15.6782C16.8153 15.5735 16.8722 15.4648 16.8722 15.2812C16.8657 11.6903 16.8676 8.09877 16.8676 4.50789V4.25957H4.66978C4.66978 5.47334 4.68466 6.66772 4.66073 7.86144C4.65362 8.22357 4.73833 8.48805 5.02415 8.71309C5.25889 8.89803 5.45935 9.12566 5.68826 9.34681C6.42545 6.7783 8.68487 5.40027 10.9307 5.5018C13.0983 5.59944 15.0292 7.14042 15.6105 9.25951C16.2042 11.4226 15.3441 13.7079 13.4708 14.9281C12.537 15.5366 11.5062 15.8218 10.3953 15.7552C8.90473 15.6653 7.67479 15.0277 6.71839 13.9128C6.43386 14.0163 6.17455 14.1101 5.88161 14.2168C6.28771 14.6177 6.69317 14.9979 7.07663 15.3989C8.11969 16.4904 7.67932 18.2726 6.25538 18.7427C6.14351 18.7796 6.02841 18.8061 5.89261 18.8436C5.95727 18.9141 6.00901 18.9736 6.06397 19.0298C6.30647 19.2781 6.56125 19.5155 6.78693 19.7774C6.88846 19.8951 6.98416 19.9358 7.13289 19.9358C9.26233 19.9319 11.3918 19.9332 13.5218 19.9332C13.5936 19.9332 13.6654 19.9332 13.7449 19.9332H13.7443ZM14.852 10.6447C14.8262 10.3963 14.8165 10.1454 14.7725 9.90035C14.4175 7.91253 12.6922 6.4679 10.6798 6.46661C8.65253 6.46531 6.92726 7.91188 6.56642 9.90876C6.53086 10.1066 6.5522 10.2631 6.72227 10.3983C6.86647 10.5127 6.99386 10.6511 7.11479 10.7921C7.67544 11.4459 7.80283 12.1792 7.47303 12.9758C7.40449 13.1414 7.41419 13.2403 7.53188 13.3748C8.66676 14.6688 10.5026 15.1396 12.1167 14.5401C13.7469 13.9348 14.8326 12.379 14.8514 10.6453L14.852 10.6447ZM16.8676 3.25855C16.8676 2.83758 16.8676 2.42824 16.8676 2.01891C16.8676 1.59212 16.8049 1.52875 16.382 1.52875C12.6967 1.52875 9.01207 1.52875 5.32678 1.52875C4.88835 1.52875 4.66914 1.74753 4.66914 2.1851V3.2579H16.8683L16.8676 3.25855ZM7.27968 20.9148C7.32236 22.2948 6.17778 23.365 4.68013 23.0507C4.6769 23.1161 4.67108 23.1794 4.67043 23.2428C4.66461 23.7672 4.70341 23.806 5.22785 23.806C7.97743 23.806 10.7264 23.806 13.4759 23.806H13.7508V20.9148H7.27968ZM3.41656 8.90967C2.98783 8.92261 2.64446 9.12178 2.46145 9.53758C2.27134 9.97019 2.34312 10.3821 2.67485 10.7203C3.39134 11.4517 4.11366 12.1766 4.84503 12.8924C5.30932 13.3477 5.91783 13.349 6.35691 12.9202C6.80181 12.485 6.80892 11.861 6.3485 11.3902C5.6333 10.6582 4.90323 9.94044 4.17962 9.21683C3.97527 9.01249 3.72437 8.91937 3.41721 8.90903L3.41656 8.90967ZM2.35476 14.7516C2.41296 14.8738 2.46986 15.1396 2.63023 15.307C3.37518 16.0882 4.13694 16.8545 4.9168 17.6007C5.34942 18.0146 5.95986 17.9719 6.37113 17.5548C6.77529 17.1448 6.81797 16.5434 6.41187 16.1173C5.66111 15.3303 4.88965 14.5621 4.10525 13.8087C3.78645 13.5029 3.37388 13.4796 2.97555 13.6613C2.57139 13.8456 2.3845 14.189 2.35476 14.7509V14.7516ZM3.03827 17.8199C2.58626 17.838 2.24676 18.043 2.06829 18.4608C1.88658 18.8856 1.95642 19.2924 2.28039 19.6235C3.00141 20.3607 3.73019 21.0914 4.46803 21.8124C4.92909 22.2631 5.54535 22.2566 5.97926 21.8221C6.41187 21.3888 6.41899 20.7719 5.96827 20.3096C5.24789 19.5711 4.51265 18.8475 3.78192 18.1193C3.57758 17.915 3.3228 17.8283 3.03892 17.8206L3.03827 17.8199ZM3.70109 7.45276V7.20056C3.70109 6.59594 3.65065 5.98614 3.71467 5.38863C3.78645 4.71223 3.58469 4.20396 3.04215 3.81726C2.87337 3.69698 2.71365 3.54631 2.52547 3.47647C2.08122 3.31287 1.56002 3.51786 1.30135 3.91878C1.04269 4.31971 1.08149 4.8532 1.43069 5.21145C2.15106 5.94993 2.88566 6.67354 3.61509 7.40297C3.62996 7.41784 3.65259 7.42495 3.70174 7.4534L3.70109 7.45276Z"
            fill={color || "currentColor"}
          />
          <path
            d="M11.1684 13.5C11.1309 14.0562 10.9938 14.2631 10.6737 14.2644C10.3517 14.2657 10.2114 14.0568 10.1758 13.4903C10.053 13.4903 9.92686 13.4942 9.80141 13.4897C9.13988 13.4658 8.61285 12.9291 8.60121 12.2708C8.59604 11.9604 8.77775 11.7334 9.05193 11.7095C9.32353 11.6855 9.53822 11.8821 9.56473 12.1983C9.58413 12.4266 9.69277 12.5294 9.92233 12.5249C10.2851 12.5184 10.6485 12.5281 11.0113 12.5217C11.4265 12.5145 11.7291 12.2197 11.7343 11.8304C11.7401 11.432 11.4316 11.1301 11.0061 11.1197C10.6679 11.1113 10.3239 11.1417 9.99153 11.0932C9.1748 10.9736 8.59669 10.2901 8.59087 9.4882C8.58505 8.67988 9.14246 8.01382 9.96049 7.85216C10.0297 7.83858 10.0995 7.82629 10.1668 7.81401C10.236 7.23525 10.3646 7.04643 10.6802 7.05289C10.9906 7.05871 11.1102 7.24042 11.1736 7.80301C11.3702 7.82629 11.5733 7.82888 11.7647 7.87738C12.3091 8.01382 12.6816 8.52339 12.6648 9.07822C12.6564 9.35434 12.4844 9.55028 12.2315 9.57162C11.9748 9.59296 11.7685 9.43323 11.7103 9.1681C11.6302 8.79951 11.625 8.79498 11.2551 8.79498C10.9247 8.79498 10.5936 8.79046 10.2631 8.79628C9.85508 8.80404 9.55956 9.09244 9.55956 9.47203C9.55956 9.85162 9.85508 10.1374 10.2625 10.1497C10.6168 10.1601 10.977 10.1297 11.3236 10.1866C12.1281 10.3179 12.692 10.9968 12.7036 11.789C12.7159 12.6006 12.1708 13.2789 11.365 13.4554C11.3023 13.469 11.2396 13.4845 11.1684 13.5007V13.5Z"
            fill={color || "currentColor"}
          />
          <path
            d="M10.7869 22.8377C10.3996 22.8377 10.0129 22.8403 9.62554 22.8371C9.29833 22.8345 9.07717 22.6347 9.07911 22.3515C9.08105 22.0695 9.30221 21.8716 9.63136 21.8704C10.4054 21.8671 11.1801 21.8678 11.9542 21.8704C12.2898 21.8716 12.5051 22.0605 12.5103 22.3456C12.5155 22.6418 12.2962 22.8358 11.9477 22.8377C11.5603 22.8397 11.1736 22.8377 10.7863 22.8377H10.7869Z"
            fill={color || "currentColor"}
          />
        </g>
        <defs>
          <clipPath id="clip0_1330_7385">
            <rect
              width="20.768"
              height="24.2147"
              fill={color || "currentColor"}
              transform="translate(0.167969 0.560547)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default TransferIcon;
