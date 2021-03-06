export const ResponseKind = {
  ALERT: 'alert',
  ALERT_CHANGES: 'alert_changes',
  ASYNC_CHECK_FINISHED: 'async_check_finished',
  COMPLETE: 'complete',
  DEBUG_INFO: 'debug_info',
  EMOTIONS: 'emotions',
  ERROR: 'error',
  FEEDBACK: 'feedback',
  FINISHED: 'finished',
  HEATMAP: 'heatmap',
  OPTION: 'option',
  PING: 'pong',
  PLAGIARISM: 'plagiarism',
  REMOVE: 'remove',
  SET_CONTEXT: 'set_context',
  START: 'start',
  SUBMIT_OT: 'submit_ot',
  SUBMIT_OT_CHUNK: 'submit_ot_chunk',
  SYNONYMS: 'synonyms',
  TAKEAWAYS: 'takeaways',
  TEXT_INFO: 'text_info',
  TEXT_MAPS: 'text_maps',
  TEXT_STATS: 'text_stats',
  TOGGLE_CHECKS: 'toggle_checks',
} as const
export type ResponseKindType = typeof ResponseKind[keyof typeof ResponseKind]
