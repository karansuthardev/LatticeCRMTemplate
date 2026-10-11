import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

// ── CursorIcon (ContactsTableCard, CustomerTableCard) ─────────────────────────
export function CursorIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="var(--color-zinc-100)"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5.10772 14.3857L5.58594 7.91256C5.61875 7.46854 5.64642 7.05187 5.67232 6.66186C5.85017 3.98379 5.94481 2.55876 7.04807 2.10979C8.15132 1.66082 9.2022 2.61969 11.1771 4.42168C11.4647 4.68413 11.772 4.96446 12.1018 5.26093L16.9102 9.58273C18.2626 10.7983 18.9389 11.4062 18.9934 11.9885C19.0309 12.3882 18.9067 12.7862 18.6489 13.0924C18.2733 13.5385 17.3734 13.6473 15.5737 13.8647C14.8156 13.9563 14.4365 14.0021 14.2073 14.2038C14.0479 14.344 13.9376 14.5321 13.8925 14.7404C13.8277 15.0399 13.9707 15.3964 14.2567 16.1095L15.7394 19.8058C15.9107 20.2328 15.9963 20.4464 15.995 20.6429C15.9932 20.9078 15.8865 21.1609 15.6986 21.3462C15.5591 21.4837 15.3471 21.57 14.9232 21.7425C14.4993 21.915 14.2873 22.0013 14.0921 22C13.8292 21.9982 13.5778 21.8907 13.3939 21.7015C13.2574 21.561 13.1717 21.3475 13.0004 20.9204L11.5177 17.2241C11.2317 16.5111 11.0887 16.1545 10.8355 15.9844C10.6595 15.8662 10.4503 15.8081 10.239 15.8187C9.935 15.834 9.63074 16.0663 9.02224 16.5308C7.57763 17.6337 6.85532 18.1851 6.27746 18.1269C5.88085 18.0871 5.51701 17.8877 5.26831 17.574C4.90595 17.1169 4.9732 16.2065 5.10772 14.3857Z"></path>
    </svg>
  );
}

// ── DashIcon (ContactsTableCard) ──────────────────────────────────────────────
export function DashIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M2.5 12L22002 12" />
    </svg>
  );
}

// ── ClockIcon (CustomerTableCard) ─────────────────────────────────────────────
export function ClockIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.52232 2 3.77426 4.94289 2.5 9H5" />
      <path d="M12 8V12L14 14" />
      <path d="M2 12C2 12.3373 2.0152 12.6709 2.04494 13M9 22C8.6584 21.8876 8.32471 21.7564 8 21.6078M3.20939 17C3.01655 16.6284 2.84453 16.2433 2.69497 15.8462M4.83122 19.3065C5.1369 19.6358 5.46306 19.9441 5.80755 20.2292" />
    </svg>
  );
}

// ── AIMailIcon (CustomerTableCard) ────────────────────────────────────────────
export function AIMailIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path
        d="M7 8L9.94202 9.73943C11.6572 10.7535 12.3428 10.7535 14.058 9.73943L17 8"
        strokeLinecap="round"
      ></path>
      <path
        d="M21.9842 12.9756C22.0053 11.9899 22.0053 11.0101 21.9842 10.0244C21.9189 6.95886 21.8862 5.42609 20.7551 4.29066C19.6239 3.15523 18.0497 3.11568 14.9012 3.03657C12.9607 2.98781 11.0393 2.98781 9.09882 3.03656C5.95033 3.11566 4.37608 3.15521 3.24495 4.29065C2.11382 5.42608 2.08114 6.95885 2.01576 10.0244C1.99474 11.0101 1.99475 11.9899 2.01577 12.9756C2.08114 16.0412 2.11383 17.5739 3.24496 18.7094C4.37608 19.8448 5.95033 19.8843 9.09883 19.9634C10.404 19.9962 11.7005 20.007 13 19.9957"
        strokeLinecap="round"
      ></path>
      <path d="M18.5 14L18.7579 14.697C19.0961 15.611 19.2652 16.068 19.5986 16.4014C19.932 16.7348 20.389 16.9039 21.303 17.2421L22 17.5L21.303 17.7579C20.389 18.0961 19.932 18.2652 19.5986 18.5986C19.2652 18.932 19.0961 19.389 18.7579 20.303L18.5 21L18.2421 20.303C17.9039 19.389 17.7348 18.932 17.4014 18.5986C17.068 18.2652 16.611 18.0961 15.697 17.7579L15 17.5L15.697 17.2421C16.611 16.9039 17.068 16.7348 17.4014 16.4014C17.7348 16.068 17.9039 15.611 18.2421 14.697L18.5 14Z"></path>
    </svg>
  );
}

// ── ChevronRightIcon (CustomerTableCard) ──────────────────────────────────────
export function ChevronRightIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9.00005 18C9.00005 18 15 13.5811 15 12C15 10.4188 9 6 9 6" />
    </svg>
  );
}
export const ChevronRight = ChevronRightIcon;

// ── CallIcon (CustomerProfileCard & AgentChatCard) ─────────────────────────────
export function CallIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <path d="M9.1585 5.71217L8.75584 4.80619C8.49256 4.21382 8.36092 3.91762 8.16405 3.69095C7.91732 3.40688 7.59571 3.19788 7.23592 3.08779C6.94883 2.99994 6.6247 2.99994 5.97645 2.99994C5.02815 2.99994 4.554 2.99994 4.15597 3.18223C3.68711 3.39696 3.26368 3.86322 3.09497 4.35054C2.95175 4.76423 2.99278 5.18937 3.07482 6.03964C3.94815 15.0901 8.91006 20.052 17.9605 20.9254C18.8108 21.0074 19.236 21.0484 19.6496 20.9052C20.137 20.7365 20.6032 20.3131 20.818 19.8442C21.0002 19.4462 21.0002 18.972 21.0002 18.0237C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8361C20.0826 15.6393 19.7864 15.5076 19.194 15.2443L18.288 14.8417C17.6465 14.5566 17.3257 14.414 16.9998 14.383C16.6878 14.3533 16.3733 14.3971 16.0813 14.5108C15.7762 14.6296 15.5066 14.8543 14.9672 15.3038C14.4304 15.7511 14.162 15.9748 13.834 16.0946C13.5432 16.2009 13.1588 16.2402 12.8526 16.1951C12.5071 16.1442 12.2426 16.0028 11.7135 15.7201C10.0675 14.8404 9.15977 13.9327 8.28011 12.2867C7.99738 11.7576 7.85602 11.4931 7.80511 11.1476C7.75998 10.8414 7.79932 10.457 7.90554 10.1662C8.02536 9.83822 8.24905 9.5698 8.69643 9.03294C9.14586 8.49362 9.37058 8.22396 9.48939 7.91885C9.60309 7.62688 9.64686 7.31234 9.61719 7.00042C9.58618 6.67446 9.44362 6.3537 9.1585 5.71217Z" />
    </svg>
  );
}

// ── SlackIcon (CustomerProfileCard) ───────────────────────────────────────────
export function SlackIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path
        d="M13 9.25V3.75C13 2.7835 13.7835 2 14.75 2C15.7165 2 16.5 2.7835 16.5 3.75V9.25C16.5 10.2165 15.7165 11 14.75 11C13.7835 11 13 10.2165 13 9.25Z"
        strokeLinecap="round"
      />
      <path
        d="M7.5 20.25V14.75C7.5 13.7835 8.2835 13 9.25 13C10.2165 13 11 13.7835 11 14.75V20.25C11 21.2165 10.2165 22 9.25 22C8.2835 22 7.5 21.2165 7.5 20.25Z"
        strokeLinecap="round"
      />
      <path
        d="M14.75 13L20.25 13C21.2165 13 22 13.7835 22 14.75C22 15.7165 21.2165 16.5 20.25 16.5L14.75 16.5C13.7835 16.5 13 15.7165 13 14.75C13 13.7835 13.7835 13 14.75 13Z"
        strokeLinecap="round"
      />
      <path
        d="M3.75 7.5L9.25 7.5C10.2165 7.5 11 8.2835 11 9.25C11 10.2165 10.2165 11 9.25 11L3.75 11C2.7835 11 2 10.2165 2 9.25C2 8.2835 2.7835 7.5 3.75 7.5Z"
        strokeLinecap="round"
      />
      <path d="M7 3.75C7 4.7165 7.7835 5.5 8.75 5.5H10.5V3.75C10.5 2.7835 9.7165 2 8.75 2C7.7835 2 7 2.7835 7 3.75Z" />
      <path d="M17 20.25C17 19.2835 16.2165 18.5 15.25 18.5H13.5V20.25C13.5 21.2165 14.2835 22 15.25 22C16.2165 22 17 21.2165 17 20.25Z" />
      <path d="M20.25 7C19.2835 7 18.5 7.7835 18.5 8.75L18.5 10.5H20.25C21.2165 10.5 22 9.7165 22 8.75C22 7.7835 21.2165 7 20.25 7Z" />
      <path d="M3.75 17C4.7165 17 5.5 16.2165 5.5 15.25V13.5L3.75 13.5C2.7835 13.5 2 14.2835 2 15.25C2 16.2165 2.7835 17 3.75 17Z" />
    </svg>
  );
}

// ── EmailIcon (CustomerProfileCard) ───────────────────────────────────────────
export function EmailIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"></path>
      <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
    </svg>
  );
}

// ── ChannelIcon (CustomerProfileCard) ─────────────────────────────────────────
export interface ChannelIconProps extends IconProps {
  channel: string;
}

export function ChannelIcon({
  channel,
  width = 24,
  height = 24,
  className,
  ...props
}: ChannelIconProps) {
  if (channel === "Call") {
    return (
      <CallIcon
        width={width}
        height={height}
        className={className}
        {...props}
      />
    );
  }
  if (channel === "Slack") {
    return (
      <SlackIcon
        width={width}
        height={height}
        className={className}
        {...props}
      />
    );
  }
  return (
    <EmailIcon width={width} height={height} className={className} {...props} />
  );
}

// ── PlusIcon (AgentChatCard) ──────────────────────────────────────────────────
export function PlusIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12.001 5.00003V19.002" />
      <path d="M19.002 12.002L4.99998 12.002" />
    </svg>
  );
}

// ── ArrowUpIcon (AgentChatCard) ───────────────────────────────────────────────
export function ArrowUpIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M8.87038 6.13264L14.7327 4.19538C18.033 3.10476 19.6831 2.55945 20.5579 3.43426C21.4327 4.30907 20.8874 5.95922 19.7968 9.25953L17.8595 15.1218C16.6236 18.8619 16.0056 20.7319 14.8796 20.9603C14.6411 21.0087 14.3955 21.0129 14.1549 20.9727C13.019 20.7832 12.3132 18.9359 10.9016 15.2413C10.6328 14.5376 10.4983 14.1858 10.2574 13.9127C10.2018 13.8497 10.1424 13.7903 10.0795 13.7348C9.80638 13.4938 9.45455 13.3594 8.75089 13.0906C5.05627 11.679 3.20896 10.9732 3.01945 9.83727C2.97931 9.59669 2.98353 9.35108 3.03189 9.11259C3.26025 7.98657 5.13029 7.36859 8.87038 6.13264Z" />
      <path d="M12.8008 11.1865L15.498 8.48926" />
    </svg>
  );
}

// ── RedoIcon (AgentChatCard) ──────────────────────────────────────────────────
export function RedoIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16.5 7.99976H18C19.4142 7.99976 20.1213 7.99976 20.5607 7.56042C21 7.12108 21 6.41397 21 4.99976V3.49976" />
      <path d="M3 11.9998C3 7.02919 7.0293 2.99976 12 2.99976C15.571 2.99976 18.0948 4.73029 20 7.08347M21 11.9998C21 16.9703 16.9707 20.9998 12 20.9998C8.42904 20.9998 5.90524 19.2692 4 16.916" />
      <path d="M7.5 15.9998H6C4.58579 15.9998 3.87868 15.9998 3.43934 16.4391C3 16.8784 3 17.5855 3 18.9998V20.4998" />
    </svg>
  );
}

// ── MenuDotsIcon (AgentChatCard) ──────────────────────────────────────────────
export function MenuDotsIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 12 6.00449 12C5.4522 12 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 12 18.0045 12C17.4522 12 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 12 12.0045 12C11.4522 12 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z" />
    </svg>
  );
}

// ── PaperclipIcon (AgentChatCard) ─────────────────────────────────────────────
export function PaperclipIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

// ── LoadingSpinner (AgentChatCard) ────────────────────────────────────────────
export function LoadingSpinner({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="spinner-gF01">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="y" />
          <feColorMatrix
            in="y"
            mode="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
            result="z"
          />
          <feBlend in="SourceGraphic" in2="z" />
        </filter>
      </defs>

      <g filter="url(#spinner-gF01)">
        <circle cx="5" cy="12" r="4">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2s"
            values="5;8;5"
            keySplines=".36,.62,.43,.99;.79,0,.58,.57"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="19" cy="12" r="4">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2s"
            values="19;16;19"
            keySplines=".36,.62,.43,.99;.79,0,.58,.57"
            repeatCount="indefinite"
          />
        </circle>

        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.75s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

// ── FileTextIcon (AgentChatCard) ──────────────────────────────────────────────
export function FileTextIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 17H16"></path>
      <path d="M8 13H12"></path>
      <path d="M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z"></path>
    </svg>
  );
}

// ── ChevronDownIcon (AgentChatCard) ───────────────────────────────────────────
export function ChevronDownIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── DatabaseIcon (AgentChatCard) ──────────────────────────────────────────────
export function DatabaseIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      {...props}
    >
      <path d="M3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12Z" />
      <path d="M3 12H21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 7.5L17 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.125 7.5H7M7.25 7.5C7.25 7.63807 7.13807 7.75 7 7.75C6.86193 7.75 6.75 7.63807 6.75 7.5C6.75 7.36193 6.86193 7.25 7 7.25C7.13807 7.25 7.25 7.36193 7.25 7.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 16.5L17 16.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.125 16.5H7M7.25 16.5C7.25 16.6381 7.13807 16.75 7 16.75C6.86193 16.75 6.75 16.6381 6.75 16.5C6.75 16.3619 6.86193 16.25 7 16.25C7.13807 16.25 7.25 16.3619 7.25 16.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── MailsIcon (AgentChatCard) ─────────────────────────────────────────────────
export function MailsIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M13 3H16C18.8284 3 20.2426 3 21.1213 3.87868C22 4.75736 22 6.17157 22 9C22 11.8284 22 13.2426 21.1213 14.1213C20.2426 15 18.8284 15 16 15H13C10.1716 15 8.75736 15 7.87868 14.1213C7 13.2426 7 11.8284 7 9C7 6.17157 7 4.75736 7.87868 3.87868C8.75736 3 10.1716 3 13 3Z" />
      <path d="M17 17.9358C16.9036 18.9318 16.6857 19.6022 16.1933 20.1025C15.3102 21 13.8888 21 11.0459 21H8.0306C5.18775 21 3.76632 21 2.88316 20.1025C2 19.2051 2 17.7606 2 14.8717C2 11.9828 2 10.5383 2.88316 9.64085C3.18449 9.33464 3.54848 9.1329 4.0102 9" />
      <path d="M21.7585 6.12671L17.587 8.31597C16.083 9.1053 15.331 9.49996 14.5 9.49996C13.6691 9.49996 12.917 9.1053 11.413 8.31597L7.24152 6.12671" />
    </svg>
  );
}

// ── NotesIcon (AgentChatCard) ─────────────────────────────────────────────────
export function NotesIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M10 11H13.5M10 7H17" />
      <path d="M13 2H12.5C8.72877 2 6.84314 2 5.67157 3.17158C4.5 4.34315 4.5 6.22877 4.5 10V14C4.5 17.7712 4.5 19.6569 5.67157 20.8284C6.84315 22 8.72876 22 12.5 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V10C21 6.22877 21 4.34315 19.8284 3.17157C18.6569 2 16.7712 2 13 2Z" />
      <path d="M6 6H3M6 12H3M6 18H3" />
    </svg>
  );
}

// ── CloseIcon (AgentChatCard) ─────────────────────────────────────────────────
export function CloseIcon({
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" />
    </svg>
  );
}
export const XIcon = CloseIcon;
