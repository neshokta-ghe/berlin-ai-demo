'use client';

import { CheckCircle, XCircle, Shield, Bot, User, Server } from 'lucide-react';

// Static example data based on real Okta system logs
// Shows proof of governance: same agent, same user, different outcomes based on scope
const EXAMPLE_LOGS = [
  {
    id: 1,
    title: "Token Grant - Inventory Read",
    outcome: "SUCCESS",
    eventType: "app.oauth2.as.token.grant.access_token",
    timestamp: "2025-12-18T17:29:13.031Z",
    actor: {
      name: "ProGear Sales Agent",
      id: "wlp8x5q7mvH86KvFJ0g7",
      type: "AI Agent"
    },
    user: {
      name: "Sarah Sales",
      email: "sarah.sales@progear.demo"
    },
    authServer: "ProGear Inventory MCP",
    requestedScopes: "inventory:read",
    grantedScopes: "inventory:read",
    grantType: "urn:ietf:params:oauth:grant-type:jwt-bearer"
  },
  {
    id: 2,
    title: "Token Grant - Inventory Write",
    outcome: "FAILURE",
    reason: "no_matching_policy",
    eventType: "app.oauth2.as.token.grant",
    timestamp: "2025-12-18T17:25:30.227Z",
    actor: {
      name: "ProGear Sales Agent",
      id: "wlp8x5q7mvH86KvFJ0g7",
      type: "AI Agent"
    },
    user: {
      name: "Sarah Sales",
      email: "sarah.sales@progear.demo"
    },
    authServer: "ProGear Inventory MCP",
    requestedScopes: "inventory:write",
    grantedScopes: null,
    grantType: "urn:ietf:params:oauth:grant-type:jwt-bearer"
  }
];

export default function OktaSystemLog() {
  const formatTime = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="mt-4">
      <div className="bg-gray-900 rounded-xl p-5 text-sm font-mono overflow-x-auto space-y-4">
        <div className="text-gray-400 mb-2">// Okta System Log - ID-JAG Token Exchange Events</div>

        {EXAMPLE_LOGS.map((log) => (
          <div
            key={log.id}
            className={`p-4 bg-gray-800/50 rounded-lg border-l-4 ${
              log.outcome === 'SUCCESS' ? 'border-green-500' : 'border-red-500'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${log.outcome === 'SUCCESS' ? 'text-green-400' : 'text-red-400'}`}>
                  {log.title}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  log.outcome === 'SUCCESS'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {log.outcome}
                </span>
              </div>
              <span className="text-gray-500 text-xs">{formatTime(log.timestamp)}</span>
            </div>

            {/* Attribution - Agent and User */}
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              {/* Agent (Actor) */}
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-blue-400 text-xs mb-2">
                  <Bot className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wide">Agent (Actor)</span>
                </div>
                <div className="text-white font-semibold">{log.actor.name}</div>
                <div className="text-gray-400 text-xs mt-1 font-mono">{log.actor.id}</div>
              </div>

              {/* User (On Behalf Of) */}
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-purple-400 text-xs mb-2">
                  <User className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wide">User (On Behalf Of)</span>
                </div>
                <div className="text-white font-semibold">{log.user.name}</div>
                <div className="text-gray-400 text-xs mt-1">{log.user.email}</div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <Server className="w-3 h-3 text-gray-500" />
                <span className="text-gray-500">Auth Server:</span>
                <span className="text-cyan-300">{log.authServer}</span>
              </div>

              <div>
                <span className="text-gray-500">Requested Scope:</span>{' '}
                <span className={log.outcome === 'FAILURE' ? 'text-red-400 line-through' : 'text-orange-300'}>
                  {log.requestedScopes}
                </span>
              </div>

              {log.grantedScopes && log.outcome === 'SUCCESS' && (
                <div>
                  <span className="text-gray-500">Granted Scope:</span>{' '}
                  <span className="text-green-300">{log.grantedScopes}</span>
                </div>
              )}

              <div>
                <span className="text-gray-500">Grant Type:</span>{' '}
                <span className="text-gray-300">{log.grantType}</span>
              </div>

              {log.outcome === 'FAILURE' && log.reason && (
                <div className="mt-2 p-2 bg-red-500/10 rounded border border-red-500/30">
                  <span className="text-red-400">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Denied: {log.reason}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Value Proposition */}
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
          <div className="font-semibold text-purple-800">Complete Attribution</div>
          <div className="text-sm text-purple-700 mt-1">
            Every request shows both the AI agent AND the user it acted on behalf of.
          </div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <div className="font-semibold text-green-800">Real-Time Visibility</div>
          <div className="text-sm text-green-700 mt-1">
            Okta logs capture every governance decision as it happens.
          </div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="font-semibold text-blue-800">Policy Enforcement</div>
          <div className="text-sm text-blue-700 mt-1">
            See exactly when and why access was granted or denied.
          </div>
        </div>
      </div>
    </div>
  );
}
