export interface MessageProps {
  type: "error" | "info";
  message?: string;
  duration?: number;
  visible: boolean;
  onDismiss: () => void;
}
