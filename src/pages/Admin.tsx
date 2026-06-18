import { useListBookings } from "@workspace/api-client-react";
import { Sparkles, Calendar, Mail, User, MessageSquare, RefreshCw } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Admin() {
  const { data: bookings, isLoading, isError, refetch } = useListBookings();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">A-One Beauty Parlour</p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-primary font-display">
              {isLoading ? "—" : (bookings?.length ?? 0)}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Latest Request</p>
            <p className="text-sm font-medium text-foreground">
              {isLoading || !bookings?.length
                ? "—"
                : formatDate(bookings[0].createdAt)}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Live &amp; Accepting
            </span>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-foreground">Appointment Requests</h2>
          </div>

          {isLoading && (
            <div className="py-20 text-center text-muted-foreground text-sm">
              Loading bookings...
            </div>
          )}

          {isError && (
            <div className="py-20 text-center text-destructive text-sm">
              Failed to load bookings. Please try refreshing.
            </div>
          )}

          {!isLoading && !isError && bookings?.length === 0 && (
            <div className="py-20 text-center">
              <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No appointment requests yet.</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Submissions from the website will appear here.</p>
            </div>
          )}

          {!isLoading && !isError && bookings && bookings.length > 0 && (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                      <th className="text-left px-6 py-3 font-medium">#</th>
                      <th className="text-left px-6 py-3 font-medium">Name</th>
                      <th className="text-left px-6 py-3 font-medium">Email</th>
                      <th className="text-left px-6 py-3 font-medium">Message</th>
                      <th className="text-left px-6 py-3 font-medium">Date &amp; Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {bookings.map((booking, i) => (
                      <tr key={booking.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 text-muted-foreground">{i + 1}</td>
                        <td className="px-6 py-4 font-medium text-foreground">{booking.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <a href={`mailto:${booking.email}`} className="hover:text-primary transition-colors">
                            {booking.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground max-w-xs">
                          <p className="line-clamp-2">{booking.message}</p>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                          {formatDate(booking.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-border">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-medium text-foreground">{booking.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <a href={`mailto:${booking.email}`} className="text-sm text-muted-foreground hover:text-primary">
                        {booking.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{booking.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{formatDate(booking.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
