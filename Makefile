.PHONY: serve clean

PORT ?= 8000

# Serve the PWA directory on localhost for development and installation.
# Service workers require HTTPS or localhost to function.
serve:
	@echo "Serving PwdHash PWA at http://localhost:$(PORT)"
	@cd pwa && python3 -m http.server $(PORT)

clean:
	rm -rf pwa/__pycache__
