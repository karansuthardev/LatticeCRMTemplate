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
  fill = "white",
  stroke = "currentColor",
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color="currentColor"
      fill={fill}
      stroke={stroke}
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

export function AIIcon({
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
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.9826 10.879L13.5745 11.4096C14.1418 11.5987 14.1418 12.4013 13.5745 12.5904L11.9826 13.121C10.8676 13.4927 9.99268 14.3676 9.62102 15.4826L9.0904 17.0745C8.90127 17.6418 8.09873 17.6418 7.9096 17.0745L7.37898 15.4826C7.00732 14.3676 6.13239 13.4927 5.0174 13.121L3.42553 12.5904C2.85815 12.4013 2.85816 11.5987 3.42553 11.4096L5.0174 10.879C6.13239 10.5073 7.00732 9.63239 7.37898 8.5174L7.9096 6.92553C8.09873 6.35815 8.90127 6.35816 9.0904 6.92553L9.62102 8.5174C9.99268 9.63239 10.8676 10.5073 11.9826 10.879Z"></path>
      <path d="M18.083 4.99045L18.8066 5.23164C19.0645 5.3176 19.0645 5.6824 18.8066 5.76836L18.083 6.00955C17.5762 6.17849 17.1785 6.57619 17.0096 7.083L16.7684 7.80658C16.6824 8.06448 16.3176 8.06447 16.2316 7.80658L15.9904 7.083C15.8215 6.57619 15.4238 6.17849 14.917 6.00955L14.1934 5.76836C13.9355 5.6824 13.9355 5.3176 14.1934 5.23164L14.917 4.99045C15.4238 4.82151 15.8215 4.42381 15.9904 3.917L16.2316 3.19342C16.3176 2.93552 16.6824 2.93553 16.7684 3.19342L17.0096 3.917C17.1785 4.42381 17.5762 4.82151 18.083 4.99045Z"></path>
      <path d="M18.083 17.9904L18.8066 18.2316C19.0645 18.3176 19.0645 18.6824 18.8066 18.7684L18.083 19.0096C17.5762 19.1785 17.1785 19.5762 17.0096 20.083L16.7684 20.8066C16.6824 21.0645 16.3176 21.0645 16.2316 20.8066L15.9904 20.083C15.8215 19.5762 15.4238 19.1785 14.917 19.0096L14.1934 18.7684C13.9355 18.6824 13.9355 18.3176 14.1934 18.2316L14.917 17.9904C15.4238 17.8215 15.8215 17.4238 15.9904 16.917L16.2316 16.1934C16.3176 15.9355 16.6824 15.9355 16.7684 16.1934L17.0096 16.917C17.1785 17.4238 17.5762 17.8215 18.083 17.9904Z"></path>
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

// ── ChevronsUpDownIcon (Dashboard Navigation / Selectors) ──────────────────────
export function ChevronsUpDownIcon({
  width = 24,
  height = 24,
  className,
  strokeWidth = 1.5,
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
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
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

// ── HandIcon (PipelineSection Canvas) ─────────────────────────────────────────
export function HandIcon({
  width = 24,
  height = 24,
  className,
  fill = "white",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      {...props}
    >
      {fill && fill !== "none" && (
        <path
          d="M12 22C9.50102 22 7.16738 20.7511 5.7812 18.6718L2.32229 13.4834C2.11214 13.1682 2 12.7978 2 12.419C2 11.3592 2.85916 10.5 3.91898 10.5H4.05489C4.65476 10.5 5.22468 10.7621 5.61507 11.2176L8 14V5.75C8 4.7835 8.7835 4 9.75 4C10.7165 4 11.5 4.7835 11.5 5.75V3.75C11.5 2.7835 12.2835 2 13.25 2C14.2165 2 15 2.7835 15 3.75V5.75C15 4.7835 15.7835 4 16.75 4C17.7165 4 18.5 4.7835 18.5 5.75V8.75C18.5 7.7835 19.2835 7 20.25 7C21.2165 7 22 7.7835 22 8.75V14.8C22 18.7765 18.7764 22 14.8 22H12.0588Z"
          fill={fill}
        />
      )}
      <g
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 11.5V8.75C18.5 7.7835 19.2835 7 20.25 7C21.2165 7 22 7.7835 22 8.75V14.8C22 18.7765 18.7764 22 14.8 22H12.0588M8 14L5.61507 11.2176C5.22468 10.7621 4.65476 10.5 4.05489 10.5H3.91898C2.85916 10.5 2 11.3592 2 12.419C2 12.7978 2.11214 13.1682 2.32229 13.4834L5.7812 18.6718C7.16738 20.7511 9.50102 22 12 22" />
        <path d="M18.5 8.5V5.75C18.5 4.7835 17.7165 4 16.75 4C15.7835 4 15 4.7835 15 5.75V10.5" />
        <path d="M15 10.5V3.75C15 2.7835 14.2165 2 13.25 2C12.2835 2 11.5 2.7835 11.5 3.75V10" />
        <path d="M11.5 10V5.75C11.5 4.7835 10.7165 4 9.75 4C8.7835 4 8 4.7835 8 5.75V14" />
      </g>
    </svg>
  );
}

// ── HandGrabIcon (PipelineSection Canvas) ─────────────────────────────────────
export function HandGrabIcon({
  width = 24,
  height = 24,
  className,
  fill = "white",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      {...props}
    >
      {fill && fill !== "none" && (
        <path
          d="M10.0588 20C6.16034 20 3 16.8397 3 12.9412V12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12V12.9412L7 6.75C7 5.7835 7.7835 5 8.75 5C9.7165 5 10.5 5.7835 10.5 6.75V5.75C10.5 4.7835 11.2835 4 12.25 4C13.2165 4 14 4.7835 14 5.75V6.75C14 5.7835 14.7835 5 15.75 5C16.7165 5 17.5 5.7835 17.5 6.75V8.75C17.5 7.7835 18.2835 7 19.25 7C20.2165 7 21 7.7835 21 8.75V12.8C21 16.7765 17.7765 20 13.8 20H10.0588Z"
          fill={fill}
        />
      )}
      <g
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 9.5V8.75C17.5 7.7835 18.2835 7 19.25 7C20.2165 7 21 7.7835 21 8.75V12.8C21 16.7765 17.7765 20 13.8 20H10.0588C6.16034 20 3 16.8397 3 12.9412V12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12V12.9412" />
        <path d="M17.5 9.5V6.75C17.5 5.7835 16.7165 5 15.75 5C14.7835 5 14 5.7835 14 6.75V8.5" />
        <path d="M14 8.5V5.75C14 4.7835 13.2165 4 12.25 4C11.2835 4 10.5 4.7835 10.5 5.75V8" />
      </g>
    </svg>
  );
}

// ── CheckIcon (CrmImportCard, etc.) ──────────────────────────────────────────
export function CheckIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  animate = false,
  ...props
}: IconProps & { animate?: boolean } = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {animate ? (
        <path
          d="M5 13.2592L7.58583 15.9568C8.2525 16.6523 8.58583 17 9.00004 17C9.41425 17 9.74759 16.6523 10.4143 15.9568L19 7"
          style={{
            strokeDasharray: 24,
            strokeDashoffset: 24,
            animation: "checkDraw 0.55s 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        />
      ) : (
        <path d="M5 13.2592L7.58583 15.9568C8.2525 16.6523 8.58583 17 9.00004 17C9.41425 17 9.74759 16.6523 10.4143 15.9568L19 7" />
      )}
    </svg>
  );
}
// ── FolderIcon (CrmImportCard) ───────────────────────────────────────────────
export function FolderIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <path d="M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7" />
    </svg>
  );
}

// ── ArrowLeftIcon & ArrowRightIcon (Carousel / Controls) ──────────────────────
export function ArrowLeftIcon({
  width = 24,
  height = 24,
  className,
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export function ArrowRightIcon({
  width = 24,
  height = 24,
  className,
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowDownIcon({
  width = 24,
  height = 24,
  className,
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

// ── TrendUpIcon & TrendDownIcon (TestimonialSection Metrics) ─────────────────
export function TrendUpIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15.544 11.5H15V17.5C15 18.4319 15 18.8978 14.8478 19.2654C14.6448 19.7554 14.2554 20.1448 13.7654 20.3478C13.3978 20.5 12.9319 20.5 12 20.5C11.0681 20.5 10.6022 20.5 10.2346 20.3478C9.74458 20.1448 9.35523 19.7554 9.15224 19.2654C9 18.8978 9 18.4319 9 17.5V11.5H8.45596C6.37322 11.5 5.33185 11.5 5.05779 10.8997C4.78372 10.2994 5.49744 9.58174 6.92487 8.14642L10.4689 4.58281C11.1868 3.86094 11.5458 3.5 12 3.5C12.4542 3.5 12.8132 3.86094 13.5311 4.58281L17.0751 8.14643C18.5026 9.58175 19.2163 10.2994 18.9422 10.8997C18.6681 11.5 17.6268 11.5 15.544 11.5Z" />
    </svg>
  );
}

export function TrendDownIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15.544 12.5H15V6.5C15 5.56812 15 5.10218 14.8478 4.73463C14.6448 4.24458 14.2554 3.85523 13.7654 3.65224C13.3978 3.5 12.9319 3.5 12 3.5C11.0681 3.5 10.6022 3.5 10.2346 3.65224C9.74458 3.85523 9.35523 4.24458 9.15224 4.73463C9 5.10218 9 5.56812 9 6.5V12.5H8.45596C6.37322 12.5 5.33185 12.5 5.05779 13.1003C4.78372 13.7006 5.49744 14.4183 6.92487 15.8536L10.4689 19.4172C11.1868 20.1391 11.5458 20.5 12 20.5C12.4542 20.5 12.8132 20.1391 13.5311 19.4172L17.0751 15.8536C18.5026 14.4183 19.2163 13.7006 18.9422 13.1003C18.6681 12.5 17.6268 12.5 15.544 12.5Z" />
    </svg>
  );
}

// ── HomeIcon (Dashboard Navigation) ──────────────────────────────────────────
export function HomeIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" />
      <path d="M15 21.5V16.5C15 15.0858 15 14.3787 14.5607 13.9393C14.1213 13.5 13.4142 13.5 12 13.5C10.5858 13.5 9.87868 13.5 9.43934 13.9393C9 14.3787 9 15.0858 9 16.5V21.5" />
    </svg>
  );
}

// ── InboxIcon (Dashboard Navigation) ─────────────────────────────────────────
export function InboxIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path
        d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
        strokeLinecap="round"
      />
      <path d="M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5" />
    </svg>
  );
}

// ── TasksIcon (Dashboard Navigation) ─────────────────────────────────────────
export function TasksIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  fill = "currentColor",
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M8.00002 4L8 4.99997C7.99998 5.94279 7.99998 6.4142 8.29287 6.7071C8.58577 7 9.05718 7 10 7L14 7C14.9428 7 15.4142 7 15.7071 6.70711C16 6.41421 16 5.94281 16 5V4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M14.45 4L13.7149 4.1492C13.7853 4.49569 14.088 4.746 14.4416 4.74995L14.45 4ZM9.54997 4L9.55835 4.74995C9.91188 4.746 10.2146 4.49569 10.285 4.1492L9.54997 4ZM19.1213 4.87868L19.6517 4.34835L19.6517 4.34835L19.1213 4.87868ZM19.1213 21.1213L19.6517 21.6517V21.6517L19.1213 21.1213ZM16 4.01732L16.0226 3.26766C16.0179 3.26752 16.0131 3.26742 16.0084 3.26737L16 4.01732ZM4.87868 4.87868L5.40901 5.40901V5.40901L4.87868 4.87868ZM8 4.01732L7.99162 3.26737C7.98688 3.26742 7.98215 3.26752 7.97741 3.26766L8 4.01732ZM14.45 4L15.185 3.8508C14.8838 2.36703 13.5732 1.25 12 1.25V2V2.75C12.8457 2.75 13.5529 3.35073 13.7149 4.1492L14.45 4ZM12 2V1.25C10.4268 1.25 9.11615 2.36703 8.81496 3.8508L9.54997 4L10.285 4.1492C10.4471 3.35073 11.1542 2.75 12 2.75V2ZM20 10H20.75C20.75 8.60699 20.7516 7.48678 20.6335 6.60825C20.5125 5.70814 20.2536 4.95027 19.6517 4.34835L19.1213 4.87868L18.591 5.40901C18.8678 5.68577 19.0482 6.07435 19.1469 6.80812C19.2484 7.56347 19.25 8.56458 19.25 10H20ZM20 16H20.75V10H20H19.25V16H20ZM20 16H19.25C19.25 17.4354 19.2484 18.4365 19.1469 19.1919C19.0482 19.9257 18.8678 20.3142 18.591 20.591L19.1213 21.1213L19.6517 21.6517C20.2536 21.0497 20.5125 20.2919 20.6335 19.3918C20.7516 18.5132 20.75 17.393 20.75 16H20ZM14 22V22.75C15.393 22.75 16.5132 22.7516 17.3918 22.6335C18.2919 22.5125 19.0497 22.2536 19.6517 21.6517L19.1213 21.1213L18.591 20.591C18.3142 20.8678 17.9257 21.0482 17.1919 21.1469C16.4365 21.2484 15.4354 21.25 14 21.25V22ZM16 4.01732L15.9774 4.76698C17.5421 4.81413 18.1804 4.99842 18.591 5.40901L19.1213 4.87868L19.6517 4.34835C18.7796 3.47633 17.5648 3.31413 16.0226 3.26766L16 4.01732ZM10 22V22.75H14V22V21.25H10V22ZM10 22V21.25C8.56458 21.25 7.56347 21.2484 6.80812 21.1469C6.07434 21.0482 5.68577 20.8678 5.40901 20.591L4.87868 21.1213L4.34835 21.6517C4.95027 22.2536 5.70814 22.5125 6.60825 22.6335C7.48678 22.7516 8.60699 22.75 10 22.75V22ZM4 16H3.25C3.25 17.393 3.24841 18.5132 3.36652 19.3918C3.48754 20.2919 3.74643 21.0497 4.34835 21.6517L4.87868 21.1213L5.40901 20.591C5.13225 20.3142 4.9518 19.9257 4.85315 19.1919C4.75159 18.4365 4.75 17.4354 4.75 16H4ZM4 10H4.75C4.75 8.56458 4.75159 7.56347 4.85315 6.80812C4.9518 6.07435 5.13225 5.68577 5.40901 5.40901L4.87868 4.87868L4.34835 4.34835C3.74643 4.95027 3.48754 5.70814 3.36652 6.60825C3.24841 7.48678 3.25 8.60699 3.25 10H4ZM8 4.01732L7.97741 3.26766C6.43521 3.31413 5.22037 3.47633 4.34835 4.34835L4.87868 4.87868L5.40901 5.40901C5.8196 4.99842 6.4579 4.81413 8.02259 4.76698L8 4.01732ZM4 10H3.25V16H4H4.75V10H4ZM8 4.01732L8.00838 4.76728L9.55835 4.74995L9.54997 4L9.54159 3.25005L7.99162 3.26737L8 4.01732ZM16 4.01732L16.0084 3.26737L14.4583 3.25005L14.45 4L14.4416 4.74995L15.9916 4.76728L16 4.01732Z"
        fill={fill}
      />
      <path d="M12 12H16" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17H16" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12H8.01" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 17H8.01" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── FileNotesIcon (Dashboard Navigation) ─────────────────────────────────────
export function FileNotesIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M8 17H16" />
      <path d="M8 13H12" />
      <path d="M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5" />
      <path d="M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z" />
    </svg>
  );
}

// ── DashboardGridIcon (Dashboard Navigation) ─────────────────────────────────
export function DashboardGridIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9.75 3H5.75C5.05222 3 4.70333 3 4.41943 3.08612C3.78023 3.28002 3.28002 3.78023 3.08612 4.41943C3 4.70333 3 5.05222 3 5.75C3 6.44778 3 6.79667 3.08612 7.08057C3.28002 7.71977 3.78023 8.21998 4.41943 8.41388C4.70333 8.5 5.05222 8.5 5.75 8.5H9.75C10.4478 8.5 10.7967 8.5 11.0806 8.41388C11.7198 8.21998 12.22 7.71977 12.4139 7.08057C12.5 6.79667 12.5 6.44778 12.5 5.75C12.5 5.05222 12.5 4.70333 12.4139 4.41943C12.22 3.78023 11.7198 3.28002 11.0806 3.08612C10.7967 3 10.4478 3 9.75 3Z" />
      <path d="M21 9.75V5.75C21 5.05222 21 4.70333 20.9139 4.41943C20.72 3.78023 20.2198 3.28002 19.5806 3.08612C19.2967 3 18.9478 3 18.25 3C17.5522 3 17.2033 3 16.9194 3.08612C16.2802 3.28002 15.78 3.78023 15.5861 4.41943C15.5 4.70333 15.5 5.05222 15.5 5.75V9.75C15.5 10.4478 15.5 10.7967 15.5861 11.0806C15.78 11.7198 16.2802 12.22 16.9194 12.4139C17.2033 12.5 17.5522 12.5 18.25 12.5C18.9478 12.5 19.2967 12.5 19.5806 12.4139C20.2198 12.22 20.72 11.7198 20.9139 11.0806C21 10.7967 21 10.4478 21 9.75Z" />
      <path d="M16.9194 20.9139C17.2033 21 17.5522 21 18.25 21C18.9478 21 19.2967 21 19.5806 20.9139C20.2198 20.72 20.72 20.2198 20.9139 19.5806C21 19.2967 21 18.9478 21 18.25C21 17.5522 21 17.2033 20.9139 16.9194C20.72 16.2802 20.2198 15.78 19.5806 15.5861C19.2967 15.5 18.9478 15.5 18.25 15.5C17.5522 15.5 17.2033 15.5 16.9194 15.5861C16.2802 15.78 15.78 16.2802 15.5861 16.9194C15.5 17.2033 15.5 17.5522 15.5 18.25C15.5 18.9478 15.5 19.2967 15.5861 19.5806C15.78 20.2198 16.2802 20.72 16.9194 20.9139Z" />
      <path d="M8.5 11.5H7C5.11438 11.5 4.17157 11.5 3.58579 12.0858C3 12.6716 3 13.6144 3 15.5V17C3 18.8856 3 19.8284 3.58579 20.4142C4.17157 21 5.11438 21 7 21H8.5C10.3856 21 11.3284 21 11.9142 20.4142C12.5 19.8284 12.5 18.8856 12.5 17V15.5C12.5 13.6144 12.5 12.6716 11.9142 12.0858C11.3284 11.5 10.3856 11.5 8.5 11.5Z" />
    </svg>
  );
}

// ── MeetingsIcon (Dashboard Navigation) ──────────────────────────────────────
export function MeetingsIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    >
      <path
        d="M3.58984 18.177C3.44055 18.0742 3.30166 17.9585 3.17157 17.8284C2 16.6569 2 14.7712 2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11C22 14.7712 22 16.6569 20.8284 17.8284C20.6983 17.9585 20.5595 18.0742 20.4102 18.177"
        strokeLinecap="round"
      />
      <path
        d="M8.6863 16.926C7.82171 17.4525 5.55483 18.5276 6.93552 19.8729C7.60997 20.53 8.36113 21 9.30553 21H14.6945C15.6389 21 16.39 20.53 17.0645 19.8729C18.4452 18.5276 16.1783 17.4525 15.3137 16.926C13.2863 15.6913 10.7137 15.6913 8.6863 16.926Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.5 11C14.5 12.3807 13.3807 13.5 12 13.5C10.6193 13.5 9.5 12.3807 9.5 11C9.5 9.61929 10.6193 8.5 12 8.5C13.3807 8.5 14.5 9.61929 14.5 11Z" />
    </svg>
  );
}

// ── DatabaseRecordsIcon (Dashboard Navigation) ───────────────────────────────
export function DatabaseRecordsIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
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
      <path
        d="M11 16.5L17 16.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.125 16.5H7M7.25 16.5C7.25 16.6381 7.13807 16.75 7 16.75C6.86193 16.75 6.75 16.6381 6.75 16.5C6.75 16.3619 6.86193 16.25 7 16.25C7.13807 16.25 7.25 16.3619 7.25 16.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── UsersRoundedIcon (Records Navigation) ────────────────────────────────────
export function UsersRoundedIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M13 11C13 8.79086 11.2091 7 9 7C6.79086 7 5 8.79086 5 11C5 13.2091 6.79086 15 9 15C11.2091 15 13 13.2091 13 11Z" />
      <path d="M11.0386 7.55773C11.0131 7.37547 11 7.18927 11 7C11 4.79086 12.7909 3 15 3C17.2091 3 19 4.79086 19 7C19 9.20914 17.2091 11 15 11C14.2554 11 13.5584 10.7966 12.9614 10.4423" />
      <path d="M15 21C15 17.6863 12.3137 15 9 15C5.68629 15 3 17.6863 3 21" />
      <path d="M21 17C21 13.6863 18.3137 11 15 11" />
    </svg>
  );
}

// ── BuildingCompanyIcon (Records Navigation) ─────────────────────────────────
export function BuildingCompanyIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    >
      <path
        d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22"
        strokeLinejoin="round"
      />
      <path d="M8 9L11 9M8 13L11 13" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22"
        strokeLinejoin="round"
      />
      <path d="M2 22L22 22" strokeLinecap="round" />
      <path
        d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── DealIcon (Records Navigation) ────────────────────────────────────────────
export function DealIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <path d="M2 7H4.86503C5.59174 7 6.28868 6.64031 6.80255 6.00005C7.53643 5.08565 8.62195 4.76636 9.60655 5.17529L11 5.75402M2 15.9668H3.62068C4.78017 15.9668 5.35991 15.9668 5.90812 16.1213C5.93477 16.1288 5.96134 16.1366 5.98782 16.1446C6.53259 16.3101 7.01496 16.6209 7.97971 17.2427C9.86787 18.4596 10.812 19.0681 11.8407 18.994C11.8892 18.9905 11.9376 18.9858 11.9859 18.9801C13.0096 18.8577 13.8119 18.0821 15.4166 16.5308L17 15" />
      <path d="M22 7.23384H19.4832C18.4174 7.23384 17.6649 6.65468 16.9003 5.88258C16.4051 5.38247 15.7731 5.08772 15.1088 5.04713C14.366 5.00175 13.5053 4.93785 12.784 5.13601C11.9811 5.35656 11.451 5.96063 10.8902 6.59196L9.44309 8.22111C8.8523 8.88621 8.8523 9.96455 9.44309 10.6297C9.953 11.2037 10.7519 11.2928 11.3519 10.8424C11.7837 10.5184 12.2743 9.99506 12.7831 9.83025C13.3557 9.64476 13.7109 10.0615 14.0354 10.4999L16.3556 13.6344C17.2167 14.7976 17.6472 15.3793 18.2358 15.6896C18.8244 16 19.4969 16 20.842 16H22" />
    </svg>
  );
}

// ── ReportsIcon (Navigation) ─────────────────────────────────────────────────
export function ReportsIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    >
      <path d="M7 17L7 13" strokeLinecap="round" />
      <path d="M12 17L12 7" strokeLinecap="round" />
      <path d="M17 17L17 11" strokeLinecap="round" />
      <path
        d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── WorkflowsIcon (Navigation) ───────────────────────────────────────────────
export function WorkflowsIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    >
      <path d="M3 5C3 3.58579 3 2.87868 3.43934 2.43934C3.87868 2 4.58579 2 6 2C7.41421 2 8.12132 2 8.56066 2.43934C9 2.87868 9 3.58579 9 5C9 6.41421 9 7.12132 8.56066 7.56066C8.12132 8 7.41421 8 6 8C4.58579 8 3.87868 8 3.43934 7.56066C3 7.12132 3 6.41421 3 5Z" />
      <path d="M3 19C3 17.5858 3 16.8787 3.43934 16.4393C3.87868 16 4.58579 16 6 16C7.41421 16 8.12132 16 8.56066 16.4393C9 16.8787 9 17.5858 9 19C9 20.4142 9 21.1213 8.56066 21.5607C8.12132 22 7.41421 22 6 22C4.58579 22 3.87868 22 3.43934 21.5607C3 21.1213 3 20.4142 3 19Z" />
      <path d="M15 7C15 5.58579 15 4.87868 15.4393 4.43934C15.8787 4 16.5858 4 18 4C19.4142 4 20.1213 4 20.5607 4.43934C21 4.87868 21 5.58579 21 7C21 8.41421 21 9.12132 20.5607 9.56066C20.1213 10 19.4142 10 18 10C16.5858 10 15.8787 10 15.4393 9.56066C15 9.12132 15 8.41421 15 7Z" />
      <path d="M6 16V8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 10C18 11.6569 16.6569 13 15 13H9C7.34315 13 6 14.3431 6 16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── PlayTriangleIcon (Active / Draft Workflows) ──────────────────────────────
export function PlayTriangleIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" />
    </svg>
  );
}

// ── DraftWorkflowIcon (Workflows Navigation) ─────────────────────────────────
export function DraftWorkflowIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M17 10H19C19.9319 10 20.3978 10 20.7654 9.84776C21.2554 9.64477 21.6448 9.25542 21.8478 8.76537C22 8.39782 22 7.93188 22 7C22 6.06812 22 5.60218 21.8478 5.23463C21.6448 4.74458 21.2554 4.35523 20.7654 4.15224C20.3978 4 19.9319 4 19 4H17C16.0681 4 15.6022 4 15.2346 4.15224C14.7446 4.35523 14.3552 4.74458 14.1522 5.23463C14 5.60218 14 6.06812 14 7C14 7.93188 14 8.39782 14.1522 8.76537C14.3552 9.25542 14.7446 9.64477 15.2346 9.84776C15.6022 10 16.0681 10 17 10Z" />
      <path d="M10 7H7C4.23858 7 2 9.23858 2 12C2 14.7614 4.23858 17 7 17H10" />
      <path d="M7.50006 14.5L8.80147 15.5858C9.60053 16.2525 10.0001 16.5858 10.0001 17C10.0001 17.4142 9.60053 17.7475 8.80147 18.4142L7.50006 19.5" />
      <path d="M17 20H19C19.9319 20 20.3978 20 20.7654 19.8478C21.2554 19.6448 21.6448 19.2554 21.8478 18.7654C22 18.3978 22 17.9319 22 17C22 16.0681 22 15.6022 21.8478 15.2346C21.6448 14.7446 21.2554 14.3552 20.7654 14.1522C20.3978 14 19.9319 14 19 14H17C16.0681 14 15.6022 14 15.2346 14.1522C14.7446 14.3552 14.3552 14.7446 14.1522 15.2346C14 15.6022 14 16.0681 14 17C14 17.9319 14 18.3978 14.1522 18.7654C14.3552 19.2554 14.7446 19.6448 15.2346 19.8478C15.6022 20 16.0681 20 17 20Z" />
    </svg>
  );
}

// ── AllRecordsTableIcon (Navigation) ─────────────────────────────────────────
export function AllRecordsTableIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    >
      <path
        d="M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.5 9L21.5 9" />
      <path d="M2.5 13L21.5 13" />
      <path d="M2.5 17L21.5 17" />
      <path d="M12 21.5L12 9" strokeLinecap="round" />
    </svg>
  );
}

// ── CommandIcon (Search Shortcut) ────────────────────────────────────────────
export function CommandIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 9V15H9V9H15Z" />
      <path d="M15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18V15Z" />
      <path d="M9 15.002H6C4.34315 15.002 3 16.3451 3 18.002C3 19.6588 4.34315 21.002 6 21.002C7.65685 21.002 9 19.6588 9 18.002V15.002Z" />
      <path d="M15 9L15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15Z" />
      <path d="M9 9V6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H9Z" />
    </svg>
  );
}

// ── PanelLeftCloseIcon (Sidebar Collapse) ────────────────────────────────────
export function PanelLeftCloseIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      color={color}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 11C21 7.22876 21 5.34315 19.8284 4.17157C18.6569 3 16.7712 3 13 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V11Z" />
      <path d="M9 3V21" />
      <path d="M16 9L14.8918 9.87868C13.6306 10.8787 13 11.3787 13 12C13 12.6213 13.6306 13.1213 14.8918 14.1213L16 15" />
    </svg>
  );
}

// ── LatticeLogoIcon (Brand Logo) ─────────────────────────────────────────────
export function LatticeLogoIcon({
  width = 24,
  height = 24,
  className,
  color = "currentColor",
  ...props
}: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 40"
      width={width}
      height={height}
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 15V31H5C5.52527 31 6.04541 31.1035 6.53076 31.3045C7.01599 31.5055 7.45703 31.8001 7.82837 32.1716C8.19983 32.543 8.49451 32.984 8.69556 33.4693C8.89648 33.9546 9 34.4747 9 35V40H21L36 25V9H31C30.4747 9 29.9546 8.89655 29.4692 8.69553C28.984 8.49451 28.543 8.19986 28.1716 7.82843C27.8002 7.457 27.5055 7.01602 27.3044 6.53073C27.1035 6.04544 27 5.5253 27 5V0H15L0 15ZM17 30H10V19L19 10H26V21L17 30Z"
        fill={color}
      />
    </svg>
  );
}

export { default as HandDrawnUnderline } from "../components/handDrawnUnderline";
