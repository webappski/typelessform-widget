export type AssistantStep = 'initial' | 'listening' | 'processing' | 'success' | 'error';

export enum ViewState {
  Hidden = 'hidden',
  Loading = 'loading',
  Ready = 'ready',
  Error = 'error'
}