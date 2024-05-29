/*
 * Copyright (c) 2015 Eric Radman <ericshane@eradman.com>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>

#include <netdb.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>
#include <unistd.h>

/*
 * getsocket
 * fetch an unused TCP port for temporary services to use
 */
int main(int argc, char *argv[]) {
	struct sockaddr_in addr;
	int sock;
	socklen_t addrlen = sizeof(addr);
	int port;
	int min_port = 14500;
	int max_port = 15000;

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_addr.s_addr = inet_addr("0.0.0.0");

	srand(time(NULL));
	while (1) {
		sock = socket(AF_INET, SOCK_STREAM, 0);
		port = min_port + rand() % (max_port - min_port + 1);
		addr.sin_port = htons(port);
		if (bind(sock, (struct sockaddr*)&addr, sizeof(addr)) == 0) {
				break;
		}
		close(sock);
	}

	getsockname(sock, (struct sockaddr*) &addr, &addrlen);
	port = ntohs(addr.sin_port);
	close(sock);

	printf("%d\n", port);
	return 0;
}
